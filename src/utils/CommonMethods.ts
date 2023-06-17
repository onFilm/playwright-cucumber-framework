export class CommonMethods {

  public static sleep(msec: number) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

}