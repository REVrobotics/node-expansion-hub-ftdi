#include "EnterFirmwareUpdateMode.h"
#include <ftd2xx.h>
#include <napi.h>
#include <thread>
#include <stdexcept>

#define MODE_CBUS (0x20)

// The reset and programming pins are active low.
#define MASK_PROGRAMMING_AND_RESET (0x30)
#define MASK_PROGRAMMING_ONLY (0x31)
#define MASK_RESET_ONLY (0x32)
#define MASK_NEITHER (0x33)

class Worker: public Napi::AsyncWorker {
    public:
        Worker(Napi::Function& callback, std::string serial)
            : Napi::AsyncWorker(callback), serial(serial) {}

        ~Worker() {}

        // Executed inside the worker-thread.
        // It is not safe to access JS engine data structure
        // here, so everything we need for input and output
        // should go on `this`.
        void Execute() {
            FT_HANDLE ftHandle;
            try {
                FT_STATUS status;

                status = FT_OpenEx(&serial, FT_OPEN_BY_SERIAL_NUMBER, &ftHandle);
                if (status != FT_OK) throw std::runtime_error("Error opening " + serial);

                // Activate programming pin only
                status = FT_SetBitMode(ftHandle, MASK_PROGRAMMING_ONLY, MODE_CBUS);
                if (status != FT_OK) throw std::runtime_error("Error setting programming pin");
                std::this_thread::sleep_for(std::chrono::milliseconds(50));

                // Activate programming and reset pins
                status = FT_SetBitMode(ftHandle, MASK_PROGRAMMING_AND_RESET, MODE_CBUS);
                if (status != FT_OK) throw std::runtime_error("Error setting reset pins");
                std::this_thread::sleep_for(std::chrono::milliseconds(50));

                // Activate programming pin only
                status = FT_SetBitMode(ftHandle, MASK_PROGRAMMING_ONLY, MODE_CBUS);
                if (status != FT_OK) throw std::runtime_error("Error un-setting reset pin");
                std::this_thread::sleep_for(std::chrono::milliseconds(50));

                // Activate no pins
                status = FT_SetBitMode(ftHandle, MASK_NEITHER, MODE_CBUS);
                if (status != FT_OK) throw std::runtime_error("Error un-setting programming pin");
                std::this_thread::sleep_for(std::chrono::milliseconds(50));

                FT_Close(ftHandle);
            } catch (const std::runtime_error& error) {
                SetError(error.what());
                if (ftHandle) {
                    FT_Close(ftHandle);
                }
            }
        }

    private:
        std::string serial;
        std::string errorString;
};

void EnterFirmwareUpdateMode(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() != 2) {
        Napi::TypeError::New(env, "Exactly 2 parameters must be provided")
            .ThrowAsJavaScriptException();
    }

    if (!info[0].IsString()) {
        Napi::TypeError::New(env, "First parameter is not a string")
                    .ThrowAsJavaScriptException();
    }

    if (!info[1].IsFunction()) {
        Napi::TypeError::New(env, "Second parameter is not a function")
                    .ThrowAsJavaScriptException();
    }

    std::string serial = info[0].ToString().Utf8Value();
    Napi::Function callback = info[1].As<Napi::Function>();

    Worker* worker = new Worker(callback, serial);
    worker->Queue();
}
