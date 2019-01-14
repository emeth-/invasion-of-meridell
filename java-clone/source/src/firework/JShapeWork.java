package firework;

import java.awt.Color;
import java.awt.Point;
import java.util.ArrayList;

public class JShapeWork
{
  private static final int P_INT = 10;
  private int period;
  private int periodChecker;
  private int mDur;
  private int mNos;
  private Color mColor;
  private ArrayList<Point> pointList;
  
  public JShapeWork(int pLength, ArrayList<Point> initList, Color col, int dur, int nos)
  {
    this.pointList = new ArrayList();
    this.pointList = initList;
    this.period = pLength;
    this.periodChecker = 0;
    this.mColor = col;
    this.mDur = dur;
    this.mNos = nos;
  }
  
  public ArrayList<JFlashBurst> checkPeriode()
  {
    this.periodChecker += 1;
    if (this.periodChecker == this.period) {
      return generateBursts();
    }
    return new ArrayList();
  }
  
  public boolean checkPeriod()
  {
    this.periodChecker += 1;
    if (this.periodChecker == this.period)
    {
      this.periodChecker = 0;
      return true;
    }
    return false;
  }
  
  public ArrayList<JFlashBurst> generateBursts()
  {
    ArrayList<JFlashBurst> flist = new ArrayList();
    for (int i = 0; i < this.pointList.size(); i++) {
      flist.add(new JFlashBurst((Point)this.pointList.get(i), this.mDur, this.mColor, this.mNos));
    }
    return flist;
  }
  
  public static ArrayList<Point> lineMaker(Point p1, Point p2)
  {
    ArrayList<Point> flist = new ArrayList();
    if (Math.abs(p1.x - p2.x) >= Math.abs(p1.y - p2.y))
    {
      if (p1.x < p2.x)
      {
        Point te = p1;
        p1 = p2;
        p2 = te;
      }
      double a_points = (p1.x - p2.x) / 10;
      double aai = (p1.y - p2.y) / a_points;
      int counter = 0;
      for (int i = p2.x; i < p1.x; i += 10)
      {
        flist.add(new Point(i, (int)(p2.y + aai * counter)));
        counter++;
      }
    }
    else
    {
      if (p1.y < p2.y)
      {
        Point te = p1;
        p1 = p2;
        p2 = te;
      }
      double a_points = (p1.y - p2.y) / 10;
      double aai = (p1.x - p2.x) / a_points;
      int counter = 0;
      for (int i = p2.y; i < p1.y; i += 10)
      {
        flist.add(new Point((int)(p2.x + aai * counter), i));
        counter++;
      }
    }
    return flist;
  }
}