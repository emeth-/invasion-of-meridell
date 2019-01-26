package firework;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;

public class JFlashBurst
  extends JFirework
{
  private static final int MSD = 50; //not used due to decompilation
  private static final int NDT = 25; //need to fix constants below
  private int smallDuration;
  private int cSize;
  private Color cColor;
  
  public JFlashBurst(Point nx, int du, Color mc, int size)
  {
    super(nx, du, mc, size);
    this.cColor = mc;
    this.cSize = size;
  }
  
  public void generateSparkCloud()
  {
    this.smallDuration = 50;
    for (int i = 0; i < this.cSize; i++) {
      this.sparkList.add(generateJSpark(this.cColor));
    }
  }
  
  public void drawJFirework(Graphics page)
  {
    if (this.smallDuration > 25) {
      for (int i = 0; i < this.sparkList.size(); i++) {
        ((JSpark)this.sparkList.get(i)).drawJSpark(page);
      }
    }
  }
  
  public void updateJFirework()
  {
    super.updateJFirework();
    this.smallDuration -= 1;
    if (this.smallDuration < 1)
    {
      this.sparkList.clear();
      generateSparkCloud();
      this.smallDuration = 50;
    }
  }
}
