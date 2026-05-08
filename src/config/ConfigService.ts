import * as dotenv from "dotenv";

// Load environment variables from .env file into process.env
dotenv.config();

/**
 * Service to manage configuration and environment variables securely.
 */
export class ConfigService {
  /**
   * Retrieves the Google Calendar API key from environment variables.
   * @throws {Error} If the API key is not configured.
   * @returns {string} The Google Calendar API key.
   */
  static getGoogleCalendarApiKey(): string {
    const key = process.env.GOOGLE_CALENDAR_API_KEY;
    if (!key) {
      throw new Error("GOOGLE_CALENDAR_API_KEY is not set in environment variables.");
    }
    return key;
  }

  /**
   * Retrieves the Google Maps Routes API key from environment variables.
   * @throws {Error} If the API key is not configured.
   * @returns {string} The Google Maps Routes API key.
   */
  static getGoogleMapsRoutesApiKey(): string {
    const key = process.env.GOOGLE_MAPS_ROUTES_API_KEY;
    if (!key) {
      throw new Error("GOOGLE_MAPS_ROUTES_API_KEY is not set in environment variables.");
    }
    return key;
  }
}
