package meridor;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JOptionPane;

public class MConst {
	final static int TILESIZE=40;
	final static boolean WEAPON=true;
	
	public final static String [] SHIELDTITLES = {
			"Stablehand","Serf","Peon",
			"Page","Squire","Guard",
			"High Guard","Knight","Baron",
			"Earl","Duke","Lord",};
	
	public enum DARKLORDS {D_BUZ,D_GRA};
	private final static int noeffect=-1;
	private final static int rangedatk=0;
	private final static int forceheal=1;
	private final static int lightning=2;
	private final static int breakheal=3;
	private final static int breaktele=4;
	private final static boolean freetele=true;
	private final static boolean freeatk=true;
	
	final static int MOEHOG=0;
	final static int SKEITH=1;
	final static int TECHO=2;
	final static int SCORCH=3;
	final static int GRUNDO=4;
	final static int D_MOE=5;
	final static int D_SKE=6;
	final static int D_TEC=7;
	final static int D_SCO=8;
	final static int D_GRU=9;
	final static int D_BUZ=10;
	final static int D_GRA=11;
	final static int BLANK=12;
	final static int VILLAGE=13;
	final static int MOUNTAIN=14;
	final static int CRATER=15;
	final static int P_HEAL=16;
	final static int P_FORT=17;
	final static int P_MEGA=18;
	final static int P_WELL=19;
	final static int GOBLET=20;
	final static int GOLDIX=21;
	final static int URNABU=22;
	final static int ANCBOO=23;
	final static int CROWN_=24;
	final static int ROYPLA=25;
	final static int ROYTAP=26;
	final static int TRECHE=27;
	final static int VASPLE=28;
	final static int VICORB=29;
	
	final static int WMACE=30;
	final static int WBSWO=31;
	final static int WHAMM=32;
	final static int WBBAX=33;
	final static int WBOW_=34;
	final static int SFORC=35;
	final static int WDSWO=36;
	final static int WHALB=37;
	final static int WDAXE=38;
	final static int SLIGH=39;
	
	final static int DTHUN=40;
	final static int DTELE=41;
	final static int DHELM=42;
	final static int DINVI=43;
	final static int DSHIE=44;
	final static int DLEAT=45;
	final static int DCHAI=46;
	final static int DPLAT=47;
	final static int WDEFL=48;
	final static int DCOUN=49;
	static Random random=new Random();
	public static Map<Integer,Image>tileGraphicMap=null;
	public static Map<Integer, ImageIcon>imageIconMap=null;
	public static Map<Integer, Equip>equipMap=null;
	public static Map<Integer, String>equipDescMap=null;
	public static Map<String, Image>shieldMap=null;
	
	public static BufferedImage titleshield;
	
	public static void initItems(){
		int [] emptyset=new int[]{};

		if (equipMap==null){
			equipMap=new HashMap<Integer,Equip>();
			equipMap.put(WMACE, new Equip("Mace",WMACE,WEAPON,1,0,0));
			equipMap.put(WBSWO, new Equip("Broad Sword",WBSWO,
					WEAPON,!freeatk,!freetele,
					1,0,3,0,0,0,noeffect,
					new int[]{TECHO},emptyset));
			equipMap.put(WHAMM, new Equip("Hammer",WHAMM,WEAPON,2,0,0));
			equipMap.put(WBBAX, new Equip("Berserker Battleaxe",WBBAX,
					WEAPON,!freeatk,freetele,
					3,0,5,0,0,0,noeffect,
					new int[]{SKEITH},emptyset));
			equipMap.put(WBOW_, new Equip("Bow",WBOW_,
					WEAPON,!freeatk,!freetele,
					2,0,4,0,0,0,rangedatk,
					new int[]{SCORCH},emptyset));
			
			equipMap.put(SFORC, new Equip("Magic Force Spell",SFORC,
					WEAPON,!freeatk,!freetele,
					3,0,5,0,0,0,forceheal,
					new int[]{GRUNDO},emptyset));
			equipMap.put(WDSWO, new Equip("Double Sword",WDSWO,
					WEAPON,!freeatk,!freetele,
					4,0,6,0,6,0,noeffect,
					new int[]{TECHO},emptyset));
			equipMap.put(WHALB, new Equip("Halberd",WHALB,
					WEAPON,freeatk,!freetele,
					4,0,4,0,0,0,noeffect,
					emptyset,emptyset));
			equipMap.put(WDAXE, new Equip("Double Axe",WDAXE,
					WEAPON,!freeatk,!freetele,
					5,0,5,0,5,0,noeffect,
					emptyset,emptyset));
			equipMap.put(SLIGH, new Equip("Magic Lightning Spell",SLIGH,
					WEAPON,!freeatk,!freetele,
					2,0,4,0,0,0,lightning,
					new int[]{GRUNDO},emptyset));
			
			equipMap.put(DTHUN, new Equip("Magic Staff of Thunder",DTHUN,
					!WEAPON,!freeatk,!freetele,
					0,1,0,3,0,0,noeffect,
					new int[]{GRUNDO},emptyset));
			equipMap.put(DTELE, new Equip("Amulet of Teleportation",DTELE,
					!WEAPON,!freeatk,!freetele,
					0,2,0,4,0,1,noeffect,
					new int[]{SKEITH},emptyset));
			equipMap.put(DHELM, new Equip("Helmet",DHELM,
					!WEAPON,!freeatk,!freetele,
					0,3,0,5,0,0,noeffect,
					new int[]{MOEHOG},emptyset));
			equipMap.put(DINVI, new Equip("Cloak of Invisibility",DINVI,
					!WEAPON,!freeatk,!freetele,
					0,3,0,5,0,0,noeffect,
					new int[]{GRUNDO},emptyset));
			equipMap.put(DSHIE, new Equip("Shield",DSHIE,
					!WEAPON,!freeatk,!freetele,
					0,4,0,6,0,0,noeffect,
					new int[]{TECHO},emptyset));
			
			equipMap.put(DLEAT, new Equip("Leather Armor",DLEAT,
					!WEAPON,!freeatk,!freetele,
					0,3,0,5,0,0,noeffect,
					new int[]{SCORCH},emptyset));
			equipMap.put(DCHAI, new Equip("Chainmail",DCHAI,
					!WEAPON,!freeatk,!freetele,
					0,4,0,4,0,0,noeffect,
					emptyset,emptyset));
			equipMap.put(DPLAT, new Equip("Plate Armor",DPLAT,
					!WEAPON,!freeatk,!freetele,
					0,5,0,7,0,0,noeffect,
					new int[]{MOEHOG},emptyset));
			equipMap.put(WDEFL, new Equip("Sword of Deflection",WDEFL,
					WEAPON,!freeatk,!freetele,
					4,0,6,0,0,0,breaktele,
					new int[]{TECHO},emptyset));
			equipMap.put(DCOUN, new Equip("Counter Enchantment Helmet",DCOUN,
					!WEAPON,!freeatk,!freetele,
					0,3,0,5,0,0,breakheal,
					new int[]{MOEHOG},emptyset));
		}
		
		if (equipDescMap==null){
			equipDescMap=new HashMap<Integer,String>();
			equipDescMap.put(WMACE, "This weapon is often affectionately refered to as 'The Smasher', 'The Destroyer', 'The Crusher', 'The Evil Neopet Mincer'... well, there are too many names to list here, but you get the idea!");
			equipDescMap.put(WBSWO, "This handy weapon was once a plough for tilling fields, but when dark times beset Meridell, it was forged into a Broadsword. Techos like these weapons very much indeed!");
			equipDescMap.put(WHAMM, "Ideal for pets that like to smash things. You not only get to bash the invaders with it, you get to feel good doing it, too!");
			equipDescMap.put(WBBAX, "Heavy weaponry only the strong dare brandish! When a Skeith has this Battleaxe along with teleportation power... whoa!!!");
			equipDescMap.put(WBOW_, "Once a Scorchio gains the experience of a Warrior, he can shoot his bow from 2 spaces away!");
			equipDescMap.put(SFORC, "Zap adjacent enemies with the power of the Magic Force Spell to inflict massive damage! In the hands of a Grundo, you can not only zap your enemies, but you can zap a fellow trooper from anywhere to heal them. (Requires both pieces to have an available move).");
			equipDescMap.put(WDSWO, "This weapon has a very nice special ability: whenever it hits it is guaranteed to do at least six points of damage. (Unfortunately it is not guaranteed to hit...)");
			equipDescMap.put(WHALB, "Touched with the Magic of Meridell, this item grants its owner unlimited moves (Max 5)!");
			equipDescMap.put(WDAXE, "Guaranteed to do at least 5 points of damage when it hits (is not guaranteed to hit).");
			equipDescMap.put(SLIGH, "Zap Invaders with a lightning bolt! When used by Grundos, this powerful spell can attack Invaders from 2 spaces away! It can also heal multiple fellow fighters in the same column! To use the healing power, click a fellow fighter in the column you wish to target. (Costs 1 move per healing).");
			equipDescMap.put(DTHUN, "The thunderous sounds from this staff will have your enemies trembling! Grundos know how to work these staffs the best. (As they do with all 'Magic' items!)");
			equipDescMap.put(DTELE, "When a Skeith wears this Amulet, he can teleport to any unoccupied space in rows 3 through 10! WARNING : This is a Important weapon!!!");
			equipDescMap.put(DHELM, "When a Moehog wears this helmet, it provides some extra protection to that skull he loves to fight with!");
			equipDescMap.put(DINVI, "When a Grundo wears this cloak, he becomes invisib|e, making it nearly impossible to hit him! Many battles are won and lost depending on whether the Grundo has this item and the Magic Force Spell!");
			equipDescMap.put(DSHIE, "Techos know how to put these shields to good use!");
			equipDescMap.put(DLEAT, "The lightest armor, but still offering good protection! All Meridellians can wear it.");
			equipDescMap.put(DCHAI, "Affords the best movement with the best protection! All Meridellians can wear it.");
			equipDescMap.put(DPLAT, "The strongest armor, but a bit cumbersome. All Meridellians can wear it.");
			equipDescMap.put(WDEFL, "Techos use this sword to deflect the enchantments cast upon Skeiths by the evil Invaders! Click on the Techo that carries this sword then click on the enchanted Skeith to free him!");
			equipDescMap.put(DCOUN, "Moehogs can use the magical power of this helmet to deflect the enchantments cast upon Grundos by the evil Invaders! If a Grundo is enchanted, click on the Moehog that wears this helmet and then click on the enchanted Grundo to free him!");
		}
	}
	public static void loadImages(){
		if (titleshield==null){
			try {
				titleshield=ImageIO.read(new File("./MeriImages/goodshield6.gif"));
			} catch (IOException e) {
				JOptionPane.showMessageDialog(null, "Error: title image missing.");
				e.printStackTrace();
			}
		}
		if (shieldMap==null){
			try {
				shieldMap=new HashMap<String,Image>();
				shieldMap.put("Stablehand", ImageIO.read(new File("./MeriImages/Stablehand.jpg")));
				shieldMap.put("Serf", ImageIO.read(new File("./MeriImages/Serf.jpg")));
				shieldMap.put("Peon", ImageIO.read(new File("./MeriImages/Peon.jpg")));
				shieldMap.put("Page", ImageIO.read(new File("./MeriImages/Page.jpg")));
				shieldMap.put("Squire", ImageIO.read(new File("./MeriImages/Squire.jpg")));
				shieldMap.put("Guard", ImageIO.read(new File("./MeriImages/Guard.jpg")));
				shieldMap.put("High Guard", ImageIO.read(new File("./MeriImages/High_Guard.jpg")));
				shieldMap.put("Knight", ImageIO.read(new File("./MeriImages/Knight.jpg")));
				shieldMap.put("Baron", ImageIO.read(new File("./MeriImages/Baron.jpg")));
				shieldMap.put("Earl", ImageIO.read(new File("./MeriImages/Earl.jpg")));
				shieldMap.put("Duke", ImageIO.read(new File("./MeriImages/Duke.jpg")));
				shieldMap.put("Lord", ImageIO.read(new File("./MeriImages/Lord.jpg")));
			} catch (IOException e) {
				JOptionPane.showMessageDialog(null, "Error: rank shield images missing.");
				e.printStackTrace();
			}
		}
		if (tileGraphicMap ==null){
			tileGraphicMap=new HashMap<Integer,Image>();
			try {				
				//terrain
				tileGraphicMap.put(VILLAGE, ImageIO.read(new File("./MeriImages/vlg.jpg")));
				tileGraphicMap.put(MOUNTAIN, ImageIO.read(new File("./MeriImages/mtn.jpg")));
				tileGraphicMap.put(CRATER, ImageIO.read(new File("./MeriImages/Smoking_Crater.jpg")));
				//ally
				tileGraphicMap.put(MOEHOG, ImageIO.read(new File("./MeriImages/Moeh00.jpg")));
				tileGraphicMap.put(SKEITH, ImageIO.read(new File("./MeriImages/Skei01.jpg")));
				tileGraphicMap.put(TECHO, ImageIO.read(new File("./MeriImages/Tech02.jpg")));
				tileGraphicMap.put(SCORCH, ImageIO.read(new File("./MeriImages/Scor03.jpg")));
				tileGraphicMap.put(GRUNDO, ImageIO.read(new File("./MeriImages/Grun04.jpg")));
				//foe
				tileGraphicMap.put(D_MOE, ImageIO.read(new File("./MeriImages/Draco_Moehog00.jpg")));
				tileGraphicMap.put(D_SKE, ImageIO.read(new File("./MeriImages/Draco_Skeith00.jpg")));
				tileGraphicMap.put(D_TEC, ImageIO.read(new File("./MeriImages/Draco_Techo00.jpg")));
				tileGraphicMap.put(D_SCO, ImageIO.read(new File("./MeriImages/Draco_Scorchio00.jpg")));
				tileGraphicMap.put(D_GRU, ImageIO.read(new File("./MeriImages/Draco_Grundo00.jpg")));
				tileGraphicMap.put(D_BUZ, ImageIO.read(new File("./MeriImages/Draco_Buzz00.jpg")));
				tileGraphicMap.put(D_GRA, ImageIO.read(new File("./MeriImages/Draco_Grarrl00.jpg")));
				//potions
				tileGraphicMap.put(P_HEAL, ImageIO.read(new File("./MeriImages/Health_Potion.jpg")));
				tileGraphicMap.put(P_FORT, ImageIO.read(new File("./MeriImages/Potion_of_Fortitude.jpg")));
				tileGraphicMap.put(P_MEGA, ImageIO.read(new File("./MeriImages/Mega_Potion.jpg")));
				tileGraphicMap.put(P_WELL, ImageIO.read(new File("./MeriImages/Potion_of_Well-Being.jpg")));
				//treasure
				tileGraphicMap.put(GOBLET, ImageIO.read(new File("./MeriImages/Goblet.jpg")).getScaledInstance(TILESIZE, TILESIZE, Image.SCALE_AREA_AVERAGING));
				tileGraphicMap.put(GOLDIX, ImageIO.read(new File("./MeriImages/Gold_Ixi.jpg")).getScaledInstance(TILESIZE, TILESIZE, Image.SCALE_AREA_AVERAGING));
				tileGraphicMap.put(URNABU, ImageIO.read(new File("./MeriImages/Urn_of_Abundance.jpg")).getScaledInstance(TILESIZE, TILESIZE, Image.SCALE_AREA_AVERAGING));
				tileGraphicMap.put(ANCBOO, ImageIO.read(new File("./MeriImages/Ancient_Book.jpg")).getScaledInstance(TILESIZE, TILESIZE, Image.SCALE_AREA_AVERAGING));
				tileGraphicMap.put(CROWN_, ImageIO.read(new File("./MeriImages/Crown.jpg")).getScaledInstance(TILESIZE, TILESIZE, Image.SCALE_AREA_AVERAGING));
				tileGraphicMap.put(ROYPLA, ImageIO.read(new File("./MeriImages/Royal_Plate.jpg")).getScaledInstance(TILESIZE, TILESIZE, Image.SCALE_AREA_AVERAGING));
				tileGraphicMap.put(ROYTAP, ImageIO.read(new File("./MeriImages/Royal_Tapestry.jpg")).getScaledInstance(TILESIZE, TILESIZE, Image.SCALE_AREA_AVERAGING));
				tileGraphicMap.put(TRECHE, ImageIO.read(new File("./MeriImages/Treasure_Chest.jpg")).getScaledInstance(TILESIZE, TILESIZE, Image.SCALE_AREA_AVERAGING));
				tileGraphicMap.put(VASPLE, ImageIO.read(new File("./MeriImages/Vase_of_Plenty.jpg")).getScaledInstance(TILESIZE, TILESIZE, Image.SCALE_AREA_AVERAGING));
				tileGraphicMap.put(VICORB, ImageIO.read(new File("./MeriImages/Orb.jpg")).getScaledInstance(TILESIZE, TILESIZE, Image.SCALE_AREA_AVERAGING));
				
				tileGraphicMap.put(WMACE, ImageIO.read(new File("./MeriImages/Mace.jpg")));
				tileGraphicMap.put(WBSWO, ImageIO.read(new File("./MeriImages/Broadsword.jpg")));
				tileGraphicMap.put(WHAMM, ImageIO.read(new File("./MeriImages/Hammer.jpg")));
				tileGraphicMap.put(WBBAX, ImageIO.read(new File("./MeriImages/Berserker_Battleaxe.jpg")));
				tileGraphicMap.put(WBOW_, ImageIO.read(new File("./MeriImages/Bow.jpg")));
				tileGraphicMap.put(SFORC, ImageIO.read(new File("./MeriImages/Magic_Force_Spell.jpg")));
				tileGraphicMap.put(WDSWO, ImageIO.read(new File("./MeriImages/Double_Sword.jpg")));
				tileGraphicMap.put(WHALB, ImageIO.read(new File("./MeriImages/Halberd.jpg")));
				tileGraphicMap.put(WDAXE, ImageIO.read(new File("./MeriImages/Double_Axe.jpg")));
				tileGraphicMap.put(SLIGH, ImageIO.read(new File("./MeriImages/Magic_Lightening_Spell.jpg")));
				
				tileGraphicMap.put(DTHUN, ImageIO.read(new File("./MeriImages/Magic_Staff_of_Thunder.jpg")));
				tileGraphicMap.put(DTELE, ImageIO.read(new File("./MeriImages/Amulet_of_Teleportation.jpg")));
				tileGraphicMap.put(DHELM, ImageIO.read(new File("./MeriImages/Helmet.jpg")));
				tileGraphicMap.put(DINVI, ImageIO.read(new File("./MeriImages/Magic_Cloak_of_Invisibility.jpg")));
				tileGraphicMap.put(DSHIE, ImageIO.read(new File("./MeriImages/Shield.jpg")));
				tileGraphicMap.put(DLEAT, ImageIO.read(new File("./MeriImages/Leather_Armor.jpg")));
				tileGraphicMap.put(DCHAI, ImageIO.read(new File("./MeriImages/Chainmail.jpg")));
				tileGraphicMap.put(DPLAT, ImageIO.read(new File("./MeriImages/Plate_Armor.jpg")));
				tileGraphicMap.put(WDEFL, ImageIO.read(new File("./MeriImages/Sword_of_Deflection.jpg")));
				tileGraphicMap.put(DCOUN, ImageIO.read(new File("./MeriImages/Counter_Enchantment_Helmet.jpg")));
				System.out.println(tileGraphicMap.size());
				
				imageIconMap=new HashMap<Integer,ImageIcon>();
				//I use the unintuitive, hacky method of setting j <= the map's size
				//because one of the tiles is a blank, meaning the number of tiles is actually
				//tileGraphicMap.size+1
				for (int j=0;j<=tileGraphicMap.size();j++){
					if (j!=BLANK)
						imageIconMap.put(j, new ImageIcon(tileGraphicMap.get(j)));
				}
				//a hack so that I can print blank squares
				imageIconMap.put(-1, new ImageIcon(new BufferedImage(30,30,BufferedImage.TRANSLUCENT)));
			} catch (IOException e){
				System.out.println("Import failure");
			}
		}
	}
	/**
	 * Check if the tile is passable TO ENEMY CHARACTERS
	 * 
	 * The checks for potions and items require a specific impl
	 */
	public static boolean checkTileIDPassable(int id){
		return id==BLANK || id == CRATER ||
				isPotion(id) ||
				isWeapon(id) || isArmor(id);
	}

	/**
	 * IDs of all weapons
	 */
	private static ArrayList<Integer> getWeaponIDArrayList(){
		ArrayList<Integer>wid=new ArrayList<Integer>(Arrays.asList(
				 WMACE,
				 WBSWO,
				 WHAMM,
				 WBBAX,
				 WBOW_,
				 SFORC,
				 WDSWO,
				 WHALB,
				 WDAXE,
				 SLIGH,
				 WDEFL
				));
		return wid;
	}
	/**
	 * Fetch the ID of a random equipment item
	 * @param wtype true for weapon, false for armour
	 * @return
	 */
	public static int getRandomEquip (boolean wtype){
		if (wtype){
			return getWeaponIDArrayList().get(random.nextInt(getWeaponIDArrayList().size()));
		} else {
			return getArmorIDArrayList().get(random.nextInt(getArmorIDArrayList().size()));
		}
	}
	/**
	 * returns whether the terrain feature is a weapon
	 */
	public static boolean isWeapon (int terrain){
		return getWeaponIDArrayList().contains(new Integer(terrain));
	}
	/**
	 * returns whether the terrain feature is armor
	 */
	public static boolean isArmor (int terrain){
		return getArmorIDArrayList().contains(new Integer(terrain));
	}

	/**
	 * IDs of all armor
	 */
	private static ArrayList<Integer> getArmorIDArrayList(){
		ArrayList<Integer>wid=new ArrayList<Integer>(Arrays.asList(
				DTHUN,
				DTELE,
				DHELM,
				DINVI,
				DSHIE,
				DLEAT,
				DCHAI,
				DPLAT,
				DCOUN
				));
		return wid;
	}

	/**
	 * Generates string summarizing stats of equipment
	 * Implementation requires an equip file to fetch the stats from
	 * @param id
	 * @return string for a battle map or ally table tooltip
	 */
	public static String getEquipToolTipStats(int id){
		if (equipMap.containsKey(id)){
			return equipMap.get(id).getToolTipStats();	
		} else {
			return null;
		}
	}
	/**
	 * Checks the passed equipmentID to see if it has the heal ability set
	 */
	public static boolean equipCanHeal(int id){
		return equipMap.containsKey(id) && equipMap.get(id).effectID==forceheal;
	}
	public static boolean equipCanLightning(int id){
		return equipMap.containsKey(id) && equipMap.get(id).effectID==lightning;
	}
	public static boolean equipCanRange(int id){
		return equipMap.containsKey(id) && (equipMap.get(id).effectID==lightning || equipMap.get(id).effectID==rangedatk);
	}
	public static boolean equipBreaksHealSeal(int id){
		return equipMap.containsKey(id) && (equipMap.get(id).effectID==breakheal);
	}
	public static boolean equipBreaksTeleSeal(int id){
		return equipMap.containsKey(id) && (equipMap.get(id).effectID==breaktele);
	}

	/**
	 * returns the amount the item increases the teleport stat by
	 * @param id the id of a weapon or armor
	 * @return
	 */
	public static int gainTeleFromEquip(int id){
		if (equipMap.containsKey(id)){
			return equipMap.get(id).teleport;
		} else {
			return 0;
		} 
	}
	/**
	 * Checks if the item allows movement after teleport
	 */
	public static boolean equipHasFreeTele(int id){
		return equipMap.containsKey(id) && (equipMap.get(id).freeTele);
	}
	/**
	 * Checks if the item allows infinite movement
	 */
	public static boolean equipHasFreeMove(int id){
		return equipMap.containsKey(id) && (equipMap.get(id).freeAttack);
	}
	public static int getEquipMinDmg(int id){
		if (equipMap.containsKey(id)){
			return equipMap.get(id).minDamage;
		} else {
			return 0;
		}
	}
	//insert code for break skills here
	/**
	 * A list of ids of all allied pets
	 */
	public static int[] getSpeciesIDList(){
		return new int[]{MOEHOG,SKEITH,TECHO,SCORCH,GRUNDO};
	}
	/**
	 * A list of ids of all enemy pets
	 */
	public static int[] getFoeIDList(){
		return new int[]{D_MOE,D_SKE,D_TEC,D_SCO,D_GRU,D_BUZ,D_GRA};
	}
	/**
	 * check if the terrain type is a potion
	 */
	public static boolean isPotion(int tileID){
		return tileID>=P_HEAL && tileID<=P_WELL;
	}
	/**
	 * check if the terrain type is a treasure item
	 */
	public static boolean isTreasure(int tileID){
		return tileID>=GOBLET && tileID<=VICORB;
	}
	/**
	 * Check if the terrain type represents an allied pet
	 */
	public static boolean isAllyPetTerrain(int tileID){
		return tileID>=MOEHOG && tileID<=GRUNDO;
	}
	/**
	 * Check if the terrain type represents an enemy pet
	 */
	public static boolean isFoePetTerrain(int tileID){
		return tileID>=D_MOE && tileID<=D_GRA;
	}
	/**
	 * Check if the terrain type represents a dark lord
	 */
	public static boolean isDarkLordTerrain(int tileID){
		return tileID==D_GRA || tileID==D_BUZ;
	}
	public static int getFoeVersionOfAlly(int sid){
		switch (sid){
			case MOEHOG:
				return D_MOE;
			case SKEITH:
				return D_SKE;
			case TECHO:
				return D_TEC;
			case SCORCH:
				return D_SCO;
			case GRUNDO:
				return D_GRU;
			default:
				return -1;
		}
	}
	public static int getAllyVersionOfFoe(int sid){
		switch (sid){
			case D_MOE:
				return MOEHOG;
			case D_SKE:
				return SKEITH;
			case D_TEC:
				return TECHO;
			case D_SCO:
				return SCORCH;
			case D_GRU:
				return GRUNDO;
			default:
				return -1;
		}
	}
}
