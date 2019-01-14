package firework;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;

public class JSpark
{
  protected Point nexus;
  protected Point nexus_0;
  protected int radius;
  protected Color myColor;
  private int myMovementX;
  private int myMovementY;
  protected double myTrSpeedX;
  protected double myTrSpeedY;
  protected double myTrLocX;
  protected double myTrLocY;
  
  public JSpark(Point nx, int ra, Color mc, double x, double y)
  {
    this.nexus = (this.nexus_0 = nx);
    this.radius = ra;
    this.myColor = mc;
    this.myTrLocX = 0.0D;
    this.myTrLocY = 0.0D;
    this.myTrSpeedX = x;
    this.myTrSpeedY = y;
    this.myMovementX = ((int)x);
    this.myMovementY = ((int)y);
  }
  
  public void drawJSpark(Graphics page)
  {
    if (this.myColor != null) {
      page.setColor(this.myColor);
    }
    page.fillOval(this.nexus.x, this.nexus.y, this.radius, this.radius);
  }
  
  public void moveJSpark()
  {
    this.myTrLocX += this.myTrSpeedX;
    this.myTrLocY += this.myTrSpeedY;
    int x = (int)this.myTrLocX;
    int y = (int)this.myTrLocY;
    this.nexus = new Point(this.nexus_0.x + x, this.nexus_0.y + y);
  }
  
  private Point testMoveJSpark()
  {
    return new Point(this.nexus.x + this.myMovementX, this.nexus.y + this.myMovementY);
  }
  
  public boolean pointInFirework(int rad, Point fw)
  {
    Point p = testMoveJSpark();
    
    double a = rad / 2.0D;
    double b = rad / 2.0D;
    double centerx = fw.x;
    double centery = fw.y;
    double x = p.x - centerx;
    double y = p.y - centery;
    
    return Math.pow(x / a, 2.0D) + Math.pow(y / b, 2.0D) <= 1.0D;
  }
  
  public Point getNexus()
  {
    return this.nexus;
  }
}
