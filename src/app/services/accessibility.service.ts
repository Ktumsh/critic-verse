import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root',
})
export class AccessibilityService {
  private renderer: Renderer2;
  private rootElement: HTMLElement = document.documentElement;

  accessibilitySettings: any = {
    disableAnimations: false,
    fontSize: 'medium',
  };

  constructor(
    private nativeStorage: NativeStorage,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.loadSettings();
  }

  async loadSettings() {
    try {
      const settings = await this.nativeStorage.getItem(
        'accessibility-settings'
      );
      if (settings) {
        this.accessibilitySettings = settings;
        this.applySettings();
      }
    } catch (error) {
      console.log('No se encontraron configuraciones de accesibilidad.');
    }
  }

  async saveSettings() {
    try {
      await this.nativeStorage.setItem(
        'accessibility-settings',
        this.accessibilitySettings
      );
      this.applySettings();
    } catch (error) {
      console.error(
        'Error al guardar las configuraciones de accesibilidad:',
        error
      );
    }
  }

  applySettings() {
    this.applyFontSize();
    this.applyAnimations();
  }

  applyFontSize() {
    switch (this.accessibilitySettings.fontSize) {
      case 'small':
        this.renderer.setStyle(this.rootElement, 'font-size', '12px');
        break;
      case 'large':
        this.renderer.setStyle(this.rootElement, 'font-size', '20px');
        break;
      case 'medium':
      default:
        this.renderer.removeStyle(this.rootElement, 'font-size');
        break;
    }
  }

  applyAnimations() {
    if (this.accessibilitySettings.disableAnimations) {
      this.disableAnimations();
    } else {
      this.enableAnimations();
    }
  }

  disableAnimations() {
    let styleElement = document.getElementById('disable-animations-style');
    if (!styleElement) {
      styleElement = this.renderer.createElement('style');
      this.renderer.setAttribute(
        styleElement,
        'id',
        'disable-animations-style'
      );
      this.renderer.appendChild(
        styleElement,
        this.renderer.createText(`
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
      `)
      );
      this.renderer.appendChild(this.rootElement, styleElement);
    }
  }

  enableAnimations() {
    const styleElement = document.getElementById('disable-animations-style');
    if (styleElement) {
      this.renderer.removeChild(this.rootElement, styleElement);
    }
  }

  setFontSize(size: string) {
    this.accessibilitySettings.fontSize = size;
    this.saveSettings();
  }

  toggleAnimations(disable: boolean) {
    this.accessibilitySettings.disableAnimations = disable;
    this.saveSettings();
  }
}
