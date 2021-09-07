export default class MoEGeoLocation {
  latitude!: Number;
  longitude!: Number;

  constructor(latitude: Number, longitude: Number) {
    if (typeof latitude == "number" && typeof longitude == "number") {
      this.latitude = latitude;
      this.longitude = longitude;
    }
  }

  toJSON(): Object {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }
}
