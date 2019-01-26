package firework;

import java.awt.Color;
import java.awt.Point;
import java.util.ArrayList;

public class JFanBurst
  extends JFirework
{
  public JFanBurst(Point nx, int du, Color mc, int size)
  {
    super(nx, du, mc, size);
    for (int i = 0; i < size; i++) {
      this.sparkList.add(generateJTrailSpark(mc));
    }
  }
  
  protected JTrailSpark generateJTrailSpark(Color mc)
  {
    int sign1 = 1;
    if (this.rand.nextBoolean()) {
      sign1 = -1;
    }
    return new JTrailSpark(this.nexus, this.rand.nextInt(5) + 1, mc, this.rand.nextDouble() * 2.0D * sign1, this.rand.nextDouble() * -8.0D);
  }
  
  public static ArrayList<JFanBurst> generateJFanBursts(int interval, int width, int height, int du, Color mc, int size)
  {
    int xshift = width / interval;
    int cpos = xshift;
    ArrayList<JFanBurst> fblist = new ArrayList();
    for (int i = 0; i < interval - 1; i++)
    {
      fblist.add(new JFanBurst(new Point(cpos, height), du, mc, size));
      cpos += xshift;
    }
    return fblist;
  }
}
