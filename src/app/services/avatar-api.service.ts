import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AvatarApiService {
  constructor(private http: HttpClient) {}

  async generateAvatar(seed: string): Promise<string | null> {
    const apiUrl = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}&backgroundType=solid,gradientLinear`;
    try {
      const response = await lastValueFrom(
        this.http.get(apiUrl, { responseType: 'text' })
      );
      return `data:image/svg+xml,${encodeURIComponent(response)}`;
    } catch (error) {
      console.error('Error al generar avatar:', error);
      return null;
    }
  }
}
