package firework;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.ArrayList;
import java.util.Random;
import javax.swing.JPanel;
import javax.swing.Timer;

public class FireworkPanel
  extends JPanel
{
  private ArrayList<JFirework> floatingList;
  final int MAX_DUR = 29;
  final int SPARK_COUNT = 50;
  private String greetinghead="";
  private String [] greetingtext={};
  final int GR_SIZE = 200;
  final Font FONTVG = new Font("Harrington", 2, 60);
  final Font FONTVT = new Font("Harrington", 2, 24);
  private Color[] colorList;
  final int colorNo = 100;
  final int DELAY1 = 20;
  final int DELAY2 = 1;
  private Timer hTimer;
  private int increment;
  private JShapeWork jispy;
  
  public FireworkPanel()
  {
    addMouseListener(new HMouseListener());
    this.floatingList = new ArrayList();
    this.hTimer = new Timer(20, new HeartListener());
    this.increment = 0;
    this.hTimer.start();
    setBackground(Color.BLACK);
    Random rand = new Random();
    this.colorList = new Color[100];
    for (int i = 0; i < this.colorList.length; i++) {
      this.colorList[i] = new Color(rand.nextInt(255), rand.nextInt(255), rand.nextInt(255));
    }
    /*
     * This code specifies a shape to be drawn by fireworks, but I don't need this function
     * in the current version. Leaving it in case I need it in the future.
     */
//    Point nx = new Point(20, 200);
//    ArrayList<Point> pl = new ArrayList();
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 0, nx.y + 280), new Point(nx.x + 140, nx.y + 0)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 0, nx.y + 260), new Point(nx.x + 100, nx.y + 260)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 0, nx.y + 380), new Point(nx.x + 140, nx.y + 180)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 0, nx.y + 360), new Point(nx.x + 140, nx.y + 360)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 40, nx.y + 500), new Point(nx.x + 140, nx.y + 440)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 220, nx.y + 60), new Point(nx.x + 360, nx.y + 60)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 220, nx.y + 140), new Point(nx.x + 360, nx.y + 140)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 280, nx.y + 0), new Point(nx.x + 280, nx.y + 500)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 220, nx.y + 220), new Point(nx.x + 400, nx.y + 220)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 400, nx.y + 220), new Point(nx.x + 400, nx.y + 350)));
    
//    nx = new Point(nx.x + 450, nx.y);
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 0, nx.y + 280), new Point(nx.x + 140, nx.y + 0)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 0, nx.y + 260), new Point(nx.x + 100, nx.y + 260)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 0, nx.y + 380), new Point(nx.x + 140, nx.y + 180)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 0, nx.y + 360), new Point(nx.x + 140, nx.y + 360)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 40, nx.y + 500), new Point(nx.x + 140, nx.y + 440)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 220, nx.y + 60), new Point(nx.x + 360, nx.y + 60)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 220, nx.y + 140), new Point(nx.x + 360, nx.y + 140)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 280, nx.y + 0), new Point(nx.x + 280, nx.y + 500)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 220, nx.y + 220), new Point(nx.x + 400, nx.y + 220)));
//    pl.addAll(JShapeWork.lineMaker(new Point(nx.x + 400, nx.y + 220), new Point(nx.x + 400, nx.y + 350)));
    
//    this.jispy = new JShapeWork(300, pl, new Color(160, 0, 186), 29, 10);
  }
  /**
   * Change the body of the displayed message
   */
  public void setText(String [] text){
	  greetingtext=text;
  }
  /**
   * Change the header of the displayed message
   */
  public void setHeader(String text){
	  greetinghead=text;
  }
  public void paintComponent(Graphics page)
  {
    super.paintComponent(page);
    int width = getWidth();
    int height = getHeight();
    for (int i = 0; i < this.floatingList.size(); i++)
    {
      if (((JFirework)this.floatingList.get(i)).expire()) {
        this.floatingList.remove(i);
      }
      ((JFirework)this.floatingList.get(i)).drawJFirework(page);
    }
    page.setFont(this.FONTVG);
    page.setColor(Color.WHITE);
    page.drawString(greetinghead, width / 8, height / 6);
    page.setFont(FONTVT);
    for (int i=0;i<greetingtext.length;i++){
        page.drawString(greetingtext[i], width / 8, height / 6 + 60 + 60 * i);
    }

  }
  
  private class HMouseListener
    implements MouseListener
  {
    private HMouseListener() {}
    
    public void mouseClicked(MouseEvent arg0) {}
    
    public void mouseEntered(MouseEvent arg0)
    {
      FireworkPanel.this.hTimer = new Timer(20, new FireworkPanel.HeartListener());
    }
    
    public void mouseExited(MouseEvent arg0)
    {
      FireworkPanel.this.hTimer = new Timer(1, new FireworkPanel.HeartListener());
    }
    
    public void mousePressed(MouseEvent arg0) {}
    
    public void mouseReleased(MouseEvent arg0) {}
  }
  
  private class HeartListener
    implements ActionListener
  {
    private HeartListener() {}
    
    public void actionPerformed(ActionEvent arg0)
    {
      FireworkPanel.this.increment += 1;
      if (FireworkPanel.this.increment < 0) {
        FireworkPanel.this.increment = 0;
      }
      if (FireworkPanel.this.jispy != null && FireworkPanel.this.jispy.checkPeriod()) {
        FireworkPanel.this.floatingList.addAll(FireworkPanel.this.jispy.generateBursts());
      }
      if (FireworkPanel.this.increment % 10 == 0)
      {
        Random rand = new Random();
        int width = FireworkPanel.this.getWidth();
        int height = FireworkPanel.this.getHeight();
        FireworkPanel.this.floatingList.add(new JSphereBurst(new Point(rand.nextInt(width), rand.nextInt(height)), rand.nextInt(29) + 29, FireworkPanel.this.colorList[rand.nextInt(FireworkPanel.this.colorList.length)], rand.nextInt(50) + 50));
      }
      if (FireworkPanel.this.increment % 200 == 0)
      {
        Random rand = new Random();
        int width = FireworkPanel.this.getWidth();
        int height = FireworkPanel.this.getHeight();
        FireworkPanel.this.floatingList.addAll(JFanBurst.generateJFanBursts(rand.nextInt(5) + 4, width, height, 116, FireworkPanel.this.colorList[rand.nextInt(FireworkPanel.this.colorList.length)], 12));
      }
      if (FireworkPanel.this.increment < 0)
      {
        Random rand = new Random();
        int width = FireworkPanel.this.getWidth();
        int height = FireworkPanel.this.getHeight();
        FireworkPanel.this.floatingList.add(new JFlashBurst(new Point(rand.nextInt(width), rand.nextInt(height)), rand.nextInt(29) + 29, FireworkPanel.this.colorList[rand.nextInt(FireworkPanel.this.colorList.length)], rand.nextInt(50) + 50));
      }
      for (int i = 0; i < FireworkPanel.this.floatingList.size(); i++) {
        ((JFirework)FireworkPanel.this.floatingList.get(i)).updateJFirework();
      }
      FireworkPanel.this.repaint();
    }
  }
}