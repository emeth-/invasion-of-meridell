package meridor;
import java.awt.Color;
import java.awt.Graphics;
import static meridor.MConst.*;

public class MeriTile {
	
	public int tileID;
	public int terrain;
	public int x,y; //coordinates
	public MeriTile (int xx,int yy){
		if (tileGraphicMap ==null){
			loadImages();
		}
		x=xx;
		y=yy;
		terrain=BLANK;
	}

	public int getGridx(){
		return x/TILESIZE;
	}
	public int getGridy(){
		return y/TILESIZE;
	}
	/**
	 * Checks if a tile is passable TO ENEMIES
	 * References MConst, which is where tile type traversability info is kept
	 */
	public boolean checkPassable(){
		return checkTileIDPassable(terrain);
	}

	/**
	 * The workhorse setter method; terrain ids are read to determine game logic
	 * @param t the tile id to set the terrain type to
	 */
	public void setTerrain(int t){
		if (tileGraphicMap.containsKey(t)){
			terrain=t;
		}else {
			terrain=BLANK;
		}
	}
	/**
	 * Used to signify that the pet on the tile has no moves remaining
	 * @param g
	 */
	public void drawMoveDepleted(Graphics g){
		g.setColor(Color.red);
		g.fillRect(x, y, TILESIZE, TILESIZE);
	}
	public void draw(Graphics g){
		/* Despite obvious redundancy,
		 * the following have to be written as is due to int rounding
		 * could be refactored to avoid this
		 */
		//set the size of the inner square
		float innerdim=(TILESIZE-BattleMap.IMGDIM)/2;
		
		if (tileGraphicMap.containsKey(terrain)){
			if (isTreasure(terrain)){
				g.drawImage(tileGraphicMap.get(terrain), 
						x, y, null);
			} else{
				g.drawImage(tileGraphicMap.get(terrain), x+(int)innerdim, y+(int)innerdim, null);
			}
		}
		g.setColor(Color.darkGray);
		if (!isTreasure(terrain))			
			g.drawRect(x+(int)innerdim, y+(int)innerdim, BattleMap.IMGDIM, BattleMap.IMGDIM);
		g.drawRect(x, y, TILESIZE, TILESIZE);
	}
}
