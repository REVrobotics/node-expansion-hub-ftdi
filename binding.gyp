{
  'targets': [
    {
      'target_name': 'addon',
      'sources': [
        'src/addon.cc',
        'src/EnterFirmwareUpdateMode.cc'
       ],
      'include_dirs': [
        "src/",
        "d2xx/",
        "<!@(node -p \"require('node-addon-api').include\")"
        ],
      'defines': [
        "NAPI_VERSION=<(napi_build_version)"
      ],
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'link_settings': {
        "conditions": [
            ["target_arch=='ia32'",
            {
              'libraries':
              [
               '-l<(module_root_dir)/d2xx/i386/ftd2xx.lib'
              ]
            }
          ],
          ["target_arch=='x64'", {
            'libraries': [
               '-l<(module_root_dir)/d2xx/amd64/ftd2xx.lib'
            ]
          }]
        ],

      },
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'xcode_settings': {
        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        'CLANG_CXX_LIBRARY': 'libc++',
        'MACOSX_DEPLOYMENT_TARGET': '10.7'
      },
      'msvs_settings': {
        'VCCLCompilerTool': { 'ExceptionHandling': 1 },
      }
    }
  ]
}
