package firework;

import java.awt.BorderLayout;
import java.awt.Dimension;

import javax.swing.JFrame;

public class FireworkDriver
{
  public static void main(String[] args)
  {
    JFrame hf = new JFrame();
    hf.setDefaultCloseOperation(3);
    hf.setTitle("");
    
    hf.setLayout(new BorderLayout());
    hf.setPreferredSize(new Dimension(950, 650));
    FireworkPanel fwp=new FireworkPanel();
    fwp.setHeader("Campaign Victory!");
    fwp.setText(new String []
    		{"The last battle has been won, and the war is over.",
				"Meridor still stands, and its citizens are safe.",
				"Now it is time for brave warriors to lay down arms and take up plows",
				"Until darkness once again threatens Meridor's bright hills.",
				"",
				"You are victorious!"
    		});
    hf.add (fwp);
    
    hf.getContentPane();
    hf.pack();
    hf.setVisible(true);
  }
}