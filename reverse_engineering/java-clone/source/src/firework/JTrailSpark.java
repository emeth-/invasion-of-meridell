package firework;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;
import java.util.ArrayList;

public class JTrailSpark
  extends JSpark
{
  private static final int TRAIL_SIZE = 10; //references removed due to decompilation
  private ArrayList<Point> pointTrail;
  
  public JTrailSpark(Point nx, int ra, Color mc, double x, double y)
  {
    super(nx, ra, mc, x, y);
    this.pointTrail = new ArrayList();
  }
  
  public void drawJSpark(Graphics page)
  {
    if (this.myColor != null) {
      page.setColor(this.myColor);
    }
    page.fillOval(this.nexus.x, this.nexus.y, this.radius, this.radius);
    for (int i = 0; i < this.pointTrail.size(); i++) {
      page.fillOval(((Point)this.pointTrail.get(i)).x, ((Point)this.pointTrail.get(i)).y, this.radius - 1, this.radius - 1);
    }
  }
  
  public void moveJSpark()
  {
    this.pointTrail.add(this.nexus);
    if (this.pointTrail.size() > 10) {
      this.pointTrail.remove(0);
    }
    this.myTrLocX += this.myTrSpeedX;
    this.myTrLocY += this.myTrSpeedY;
    int x = (int)this.myTrLocX;
    int y = (int)this.myTrLocY;
    this.nexus = new Point(this.nexus_0.x + x, this.nexus_0.y + y);
  }
}