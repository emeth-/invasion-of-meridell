package firework;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;
import java.util.ArrayList;
import java.util.Random;

public class JFirework
{
  protected static final int MAX_SPARK_RAD = 5;
  protected static final int MAX_SPEED = 8;
  protected static final int MAX_SPEED2 = 4;
  protected Point nexus;
  protected int radius;
  protected int duration;
  protected ArrayList<JSpark> sparkList;
  Random rand;
  
  public JFirework(Point nx, int du, Color mc, int size)
  {
    this.nexus = nx;
    this.radius = 0;
    this.duration = du;
    
    this.sparkList = new ArrayList();
    this.rand = new Random();
  }
  
  protected JSpark generateJSpark(Color mc)
  {
    int sign1 = 1;int sign2 = 1;
    if (this.rand.nextBoolean()) {
      sign1 = -1;
    }
    if (this.rand.nextBoolean()) {
      sign2 = -1;
    }
    if (this.rand.nextDouble() < 0.3D) {
      return new JSpark(this.nexus, this.rand.nextInt(5) + 1, mc, this.rand.nextDouble() * 8.0D * sign1, this.rand.nextDouble() * 8.0D * sign2);
    }
    return new JSpark(this.nexus, this.rand.nextInt(5) + 1, mc, this.rand.nextDouble() * 4.0D * sign1, this.rand.nextDouble() * 4.0D * sign2);
  }
  
  protected JSpark generateJTrailSpark(Color mc)
  {
    int sign1 = 1;int sign2 = 1;
    if (this.rand.nextBoolean()) {
      sign1 = -1;
    }
    if (this.rand.nextBoolean()) {
      sign2 = -1;
    }
    return new JTrailSpark(this.nexus, this.rand.nextInt(5) + 1, mc, this.rand.nextDouble() * 8.0D * sign1, this.rand.nextDouble() * 8.0D * sign2);
  }
  
  public void drawJFirework(Graphics page)
  {
    for (int i = 0; i < this.sparkList.size(); i++) {
      ((JSpark)this.sparkList.get(i)).drawJSpark(page);
    }
  }
  
  public void updateJFirework()
  {
    this.radius += 8;
    for (int i = 0; i < this.sparkList.size(); i++) {
      if (((JSpark)this.sparkList.get(i)).pointInFirework(this.radius, this.nexus)) {
        ((JSpark)this.sparkList.get(i)).moveJSpark();
      }
    }
  }
  
  public boolean expire()
  {
    this.duration -= 1;
    return this.duration < 0;
  }
  
  public int getDuration()
  {
    return this.duration;
  }
}