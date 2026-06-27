export class PlatformDetector {
  static detect() {
    const ua = navigator.userAgent.toLowerCase();
    
    if (ua.includes('win')) return 'windows';
    if (ua.includes('linux')) return 'ubuntu';
    if (ua.includes('mac')) return 'macos';
    
    return 'windows'; // default
  }

  static isMobile() {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      navigator.userAgent.toLowerCase()
    );
  }
}
