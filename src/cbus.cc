#include <napi.h>
#include <ftd2xx.h>

using namespace Napi;

Napi::Array GetFtdiDevices(const Napi::CallbackInfo& info) {
    FT_STATUS ftStatus;
    DWORD numDevs;

    // create the device information list
    ftStatus = FT_CreateDeviceInfoList(&numDevs);
    if (ftStatus == FT_OK) {
        printf("Number of devices is %d\n", numDevs);
    } else {
        printf("Error calling FT_CreateDeviceInfoList: %d\n", ftStatus);
    }

    return Napi::Array::Array();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "getFtdiDevices"),
              Napi::Function::New(env, GetFtdiDevices));
    return exports;
}

NODE_API_MODULE(cbus, Init)
