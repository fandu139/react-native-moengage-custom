/// Helper class to track event attributes.
import MoEGeoLocation from "./MoEGeoLocation";

export default class MoEProperties {
  private generalAttributes: Object;
  private locationAttributes: Object;
  private dateTimeAttributes: Object;
  private isNonInteractive: Boolean;

  constructor() {
    this.generalAttributes = new Object();
    this.locationAttributes = new Object();
    this.dateTimeAttributes = new Object();
    this.isNonInteractive = false;
  }

  toJSON(): Object {
    return {
      eventAttributes: {
        generalAttributes: this.generalAttributes,
        locationAttributes: this.locationAttributes,
        dateTimeAttributes: this.dateTimeAttributes,
      },
      isNonInteractive: this.isNonInteractive,
    };
  }

  /**
   * Call this method to add general attributes
   * @param {String}key : key for the attribute
   * @param {String | Number | Boolean | Array<String> |  Array<Number>}value : value for the attribute
   */
  addAttribute(key: String, value: String | Number | Boolean | Array<String> | Array<Number>) {

    if (!this.validateKeyValue(key, value)) {
      return;
    }
    if (Array.isArray(value)) {
      value = (value as Array<any>).filter( e => (this.validateType(["string", "number"], e)));
    } else if (!this.validateType(["string", "number", "boolean"], value)) {
      console.warn("MoEProperties->addAttribute: invalid attribute");
      return
    }
    
    {/* Ignore TS Ignore on Text
    // @ts-ignore */}
    this.generalAttributes[key.toString()] = value;
  }

  /**
   * Call this method to add date attributes
   * @param {String}key : key for the attribute
   * @param {String}date : The value of the attribute, in ISO format [yyyy-MM-dd'T'HH:mm:ssZ] or [yyyy-MM-dd'T'HH:mm.sssZ].
   * eg. 2020-06-08T11:20:58.353Z OR 2020-06-10T12:42:10Z
   */
  addDateAttribute(key: String, date: String) {
    if (!this.validateKeyValue(key, date)) {
      return;
    }
    if (!this.validateType(["string"], date)) {
      console.warn("MoEProperties->addDateAttribute:  invalid date attribute");
      return
    }

    {/* Ignore TS Ignore on Text
    // @ts-ignore */}
    this.dateTimeAttributes[key.toString()] = date;
  }

  /**
   * Call this method to add location attributes
   * @param {String}key : key for the attribute
   * @param {MoEGeoLocation}location : The value of the attribute, should be of type MOEGeoLocation.
   */
  addLocationAttribute(key: String, location: MoEGeoLocation) {
    if (
      !this.validateKeyValue(key, location) ||
      !(location instanceof MoEGeoLocation)
    ) {
      return;
    }
    if (this.validateLatLong(location)) {
      {/* Ignore TS Ignore on Text
      // @ts-ignore */}
      this.locationAttributes[key.toString()] = location.toJSON();
    } else {
      console.warn("MoEGeoLocation->addLocationAttribute: invalid coordinates");
    }
  }

  /**
   * Call this method to marks an event as non-interactive.
   **/
  setNonInteractiveEvent() {
    this.isNonInteractive = true;
  }

  private validateKeyValue(key: String, value: any): Boolean {
    return !(key == null || key.length == 0 || value == null);
  }

  private validateType(arrTypes: Array<String>, value: any): Boolean {
    let type = typeof value;
    return arrTypes.includes(type);
  }

  private validateLatLong(location: MoEGeoLocation) {
    return (
      location.latitude > -91 &&
      location.latitude < 91 &&
      location.longitude > -181 &&
      location.longitude < 181
    );
  }
}
