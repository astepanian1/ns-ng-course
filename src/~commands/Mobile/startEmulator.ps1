
#CTRL+G Start CodeRunner and CTRL+ALT+G Stop CodeRunner (VS Code Bound Shortcuts)
function Start-Emulator {

$CMD = 'C:\Android\android-sdk\emulator\emulator.exe'
$arg1 = '-avd'
$arg2 ='Pixel_3_XL_API_29'
    & $CMD $arg1 $arg2
}

& Start-Emulator

