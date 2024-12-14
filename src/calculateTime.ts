export interface CalculateTime {
  timeInSeconds(initial: Date, final: Date): number;
}

export class CalculateTimeDistance implements CalculateTime {
  timeInSeconds(initial: Date, final: Date): number {
    const initialTime = new Date(initial);
    const finalTime = new Date(final);

    let difference: number =
      (finalTime.getTime() - initialTime.getTime()) / 1000;

    if (difference < 0) {
      difference += 24 * 60 * 60;
    }

    return difference;
  }
}
