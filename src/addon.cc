#include <napi.h>
#include "EnterFirmwareUpdateMode.h"

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "enterExpansionHubFirmwareUpdateMode"),
                Napi::Function::New(env, EnterFirmwareUpdateMode));
    return exports;
}

NODE_API_MODULE(addon, Init)
