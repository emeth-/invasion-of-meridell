package firework;

import java.awt.Color;
import java.awt.Point;

public class JSphereBurst
  extends JFirework
{
  public JSphereBurst(Point nx, int du, Color mc, int size)
  {
    super(nx, du, mc, size);
    if (this.rand.nextDouble() > 0.1D) {
      for (int i = 0; i < size; i++) {
        this.sparkList.add(generateJSpark(mc));
      }
    } else {
      for (int i = 0; i < size; i++) {
        this.sparkList.add(generateJTrailSpark(mc));
      }
    }
  }
}
