package meridor;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;
import javax.swing.*;
import javax.swing.border.EtchedBorder;
import javax.swing.event.TableModelEvent;
import javax.swing.event.TableModelListener;
import javax.swing.table.DefaultTableModel;
import firework.FireworkPanel;

public class MeriPanel extends JPanel {

	final static int MAX_MOVES=5;
	final static int MAX_LOGTEXT=10;
	final static int MAX_VILLAGES=6;

	final static String[] clearlogtext={
			"Your small squad is the kingdom's last defense. Make sure at least 3 villages survive!",
			"Hover the mouse over tiles on the map for information.",
			"Click on the tiles of your soldiers to select them, then click a blank tile to move there.",
			"Your soldiers can also collect items by moving over them.",
			"Items may affect each soldier differently and even grant them unique abilities!",
			"When you are next to the enemy, click them to attack!",
			"Each of your soldiers has different amount of actions per turn.",
			"You can take 5 actions total across your units each turn. Make them count!"};

	public static Random random =MConst.random;
	public ArrayList<MeriPet> ally,foe;
	public int movesLeft;
	public int villagesLeft;
	public int turnCount=0;
	public Campaign campaign;
	public MeriPet selected;
	public int selectedEquipID;
	
	public final static Dimension initSize=new Dimension(900,603);

	ArrayList<String> battlelogtext=new ArrayList<String>(Arrays.asList(clearlogtext));

	BattleMap bm;
	UnitDisplay um;
	InfoDisplay im;
	SelectParty sp;
	BattleLog bl;
	EquipInfo ei;
	VictoryPanel vp;
	FireworkPanel fwp;
	IntroPanel ip;

	boolean battlemode=false;
	boolean victory=false;

	public MeriPanel (){
		movesLeft=MAX_MOVES;
		villagesLeft=MAX_VILLAGES;
		selected=null;
		selectedEquipID=-1;
		campaign=null;

		ally=new ArrayList<MeriPet>();
		foe=new ArrayList<MeriPet>();
		
		ei=new EquipInfo();
		
		initIntroScreen();
	}
	public void initIntroScreen (){
		setLayout(new GridBagLayout());
		GridBagConstraints c=new GridBagConstraints();
		c.weightx=0.5;
		c.fill=GridBagConstraints.BOTH;

		c.gridx=0;
		c.gridy=0;
		c.gridheight=GridBagConstraints.RELATIVE;
		
		ip=new IntroPanel();
		add (ip,c);
	}
	/**
	 * Intended to be called at the beginning of a battle to set up the field and units
	 */
	public void initBattleMap(){
		bm.genTerrainMap();
		if (ally==null){
			ally=campaign.allies;
		}
		foe=campaign.generateFoes();
		refreshAllyAll();
		villagesLeft=MAX_VILLAGES;
		movesLeft=MAX_MOVES;

		placePets();
		bm.updatePetLocations(getPetLocations());
		if (!campaign.treasureCollected){
			bm.placeTreasure(campaign.getTreasure());			
		}
		bm.placePotions(campaign.getPotion());
		int[]itemList=campaign.getItemList();
		if (itemList.length<4){
			bm.placeEquips(new int[]{
					MConst.getRandomEquip(MConst.WEAPON),
					MConst.getRandomEquip(MConst.WEAPON),
					MConst.getRandomEquip(!MConst.WEAPON),
					MConst.getRandomEquip(!MConst.WEAPON)
			});
		} else {
			bm.placeEquips(itemList);
		}
		update();
		im.updateMissionTitle();
		clearBattleLog();
		turnCount=0;
		updateBattleLog("Turn "+(++turnCount));
	}
	/**
	 * Starts the game logic so that the game is playable
	 */
	public void startNewCampaign(){
		campaign=new Campaign();
		ally=campaign.getAllies();
		if (battlemode){
			toggleActive();
		}
		toggleActive(); //krufty way of refreshing the jtables
		toggleActive();
		sp.updateStatData();
	}
	/**
	 * Used to load a serialized Campaign object
	 * Need to work out how this is done (later)
	 */
	public void loadCampaign(Campaign c){
		campaign =c;
		ally=campaign.getAllies();
//		System.out.println(ally.size());
		if (battlemode){
			toggleActive();
		}
		toggleActive();
		toggleActive();
		sp.updateStatData();
	}
	/**
	 * Uses the 10 empty string array to maintain the size of the box while blanking it
	 * Doesn't work as planned
	 */
	public void clearBattleLog (){
		battlelogtext=new ArrayList<String>(Arrays.asList(clearlogtext));
	}
	public void updateBattleLog(String change){
		if (battlelogtext.size()>=MAX_LOGTEXT){
			battlelogtext.remove(0);
		}
		battlelogtext.add(change);
		bl.updateText();
	}
	/**
	 * Attempt to refresh battlemap and table display
	 * Called from child panels to update parent (this class)
	 * only for
	 */
	public void update(){
		//most panels depend on the battlemap, so I use it as the dependency check
		if (bm!=null){

			bm.revalidate();
			bm.repaint();

			/*
			 * this is ridiculously hacky and could be avoided if I just
			 * wrote a custom tablemodel 
			 */
			remove(um);
			GridBagConstraints c=new GridBagConstraints();
			c.weightx=0.5;
			c.fill=GridBagConstraints.BOTH;
			c.gridx=1;
			c.gridy=0;
			c.gridheight=GridBagConstraints.RELATIVE;
			um=new UnitDisplay();
			add (um,c);
			um.revalidate();
			um.repaint();

			im.updateMovesLeft();
			im.updateEquipDisplay();
			im.updateTreasureFound();
			im.revalidate();
			im.repaint();
		}

		//the character select panel which only displays when the others are gone
		if (sp!=null){
			sp.revalidate();
			sp.repaint();
		}
	}
	/**
	 * The locations where units are placed is hardcoded based on the original game
	 * This method is called at the beginning of the scenario to place units
	 */
	public void placePets(){
		int[][]allylocs={
				new int []{0,9},
				new int []{2,9},
				new int []{4,9},
				new int []{6,9},
				new int []{8,9}
		};
		int[][]foelocs={
				new int []{1,0},
				new int []{3,0},
				new int []{5,0},
				new int []{7,0},
				new int []{9,0},
				new int []{2,2},
				new int []{4,2},
				new int []{6,2},
				new int []{8,2},
				new int []{0,2}
		};
		for (int i=0;i<ally.size();i++){
			ally.get(i).setLocation(allylocs[i]);
		}
		for (int i=0;i<foe.size();i++){
			foe.get(i).setLocation(foelocs[i]);
		}
	}
	/**
	 * Set the selected unit for player movement, and update the display
	 */
	public void setSelected (MeriPet m){
		selected=m;
		im.updatePetMaxMoves();
		im.updateDeselect();
	}
	/**
	 * Implementation to do whatever necessary to destroy a village
	 * May change later
	 */
	public void razeVillage(){
		villagesLeft--;
		im.updateVillagesLeft();
		updateBattleLog("The invaders have cruelly put a village to the torch...");
		int vmargin=(villagesLeft-MAX_VILLAGES/2);
		if (vmargin>0)
			updateBattleLog("Don't let more than "+vmargin+" villages be lost!");
		else
			updateBattleLog("It's down to the wire! Protect every remaining village!");
		System.out.println("village razed!");
	}
	/**
	 * Resets the movement for the allied units at beginning of turn
	 */
	public void refreshAllyMove(){
		movesLeft=MAX_MOVES;
		im.updateMovesLeft();
		for (int i=0;i<ally.size();i++){
			ally.get(i).refreshMove();
		}
	}
	/**
	 * Resets all attrited stats for allied units between fights
	 */
	public void refreshAllyAll(){
		for (int i=0;i<ally.size();i++){
			ally.get(i).refreshTotal();
		}
	}
	/**
	 * Returns true if the player has won the game
	 */
	public boolean checkGameWon(){
		return ally.size()>0 && foe.size()==0;
	}
	/**
	 * Returns true if the player has failed the battle
	 */
	public boolean checkGameLost(){
		return foe.size()>0 && (ally.size()==0 || villagesLeft<MAX_VILLAGES/2);
	}
	/**
	 * Process 1 move per foe, and then give turn back to the player
	 * Not sure if this is final
	 * Priority is:
	 * 1st: player units must be attacked
	 * 2nd: villages that can be destroyed
	 * 3rd: move down/to nearest village
	 */
	public void processFoeTurn(){
		if (foe.size()<2 && bm.isTreasurePresent()){
			updateBattleLog("Foreseeing defeat, the invaders hurry their treasure off the map!");
			bm.removeTreasure();
		}
		ArrayList <MeriPet> slainallies=new ArrayList<MeriPet>();
		for (int i=0;i<foe.size();i++){
			MeriPet chosen=foe.get(i);
			//highest priority: destroy village
			//this implementation is redundant. I duplicate the search of adj tiles
			ArrayList<int[]> nearvillages=bm.findAdjVillage(chosen.getLocation()[0], chosen.getLocation()[1]);
			if (!nearvillages.isEmpty()){
				int[]vloc=nearvillages.get(0);
				//bm.razeVillage(vloc[0], vloc[1]); //not needed
				bm.movePet(chosen, vloc);
				razeVillage();
			} else {
				//split the priorities of dark lords and invaders
				//dark lords attempt to move down first and attack if they cannot
				//invaders attack first and move down if there are no foes in range
				
				//both invader/dark lord will use the sme algorithm to check for targets
				ArrayList<MeriPet> targets=bm.findNextFoeTarget(chosen.getLocation()[0], chosen.getLocation()[1]);
				ArrayList<MeriPet> horitargets=bm.findHoriFoeTarget(chosen.getLocation()[0], chosen.getLocation()[1]);
				//invader decision tree
				if (MConst.isDarkLordTerrain(chosen.getSpeciesID())){
					//first: attempt to cast a seal
					//this is the only time random is called in a critical function
					boolean teleseal=random.nextBoolean();
					MeriPet sealtarget=ally.get(random.nextInt(ally.size()));
					System.out.println(sealtarget.name+" "+teleseal);
					if (teleseal && sealtarget.canTeleport()){
						updateBattleLog(MeriPet.castTeleSeal(chosen, sealtarget));
					} else if (!teleseal && (sealtarget.canHeal() || sealtarget.canLightning())){
						updateBattleLog(MeriPet.castHealSeal(chosen, sealtarget));
					}
					
					ArrayList<MeriTile>below=bm.getPassableBelow(chosen.getLocation()[0], chosen.getLocation()[1]);
					//if at or below row 7, move to a nearby village or attack if cannot move
					if (chosen.getLocation()[1]>=7){
						//find nearest column with village and move in that direction
						int direction=bm.getNearestColumnMultiplier(chosen.getLocation()[0]);
						if (direction==1 || direction==-1){
							//THIS METHOD IS PRONE TO CRASHING THE GAME (when pathing to a village on the edge on row 6)
							//CONSIDER REPLACING IT
							ArrayList<int[]>path=bm.findOneTilePath(chosen.getLocation(), new int[]{chosen.getLocation()[0]+direction*2,chosen.getLocation()[1]});
							if (path.size()>0){
								bm.movePet(chosen, path.get(0));								
							} else if (targets.size()>0) {
								//attack?
								MeriPet target=targets.get(0);
								updateBattleLog(MeriPet.attack(chosen, target));
								if (target.checkDead()){
									updateBattleLog(target.name+" has been corrupted by defeat! Please free them!");
									ally.remove(target);
									slainallies.add(target.convert());
								}
							}
						}
					}
					//if above row 6, move down
					else if (below.size()>0) {
						bm.movePet(chosen, new int[]{below.get(0).getGridx(),below.get(0).getGridy()});
					}
					//if can't move down, ATTACK
					else if (targets.size()>0) {
						MeriPet target=targets.get(0);
						updateBattleLog(MeriPet.attack(chosen, target));
						if (target.checkDead()){
							updateBattleLog(target.name+" has been corrupted by defeat! Please free them!");
							ally.remove(target);
							slainallies.add(target.convert());
						}
					}
				}
				//normal invader decision tree
				else {
					//second priority action: kill npets 
					if (!targets.isEmpty()){
						MeriPet target=targets.get(0);
						updateBattleLog(MeriPet.attack(chosen, target));
						if (target.checkDead()){
							updateBattleLog(target.name+" has been corrupted by defeat! Please free them!");
							ally.remove(target);
							slainallies.add(target.convert());
							//I should not need to update the map because:
							//a)turn is resolved before reprint
							//b)tile is still classed as ally, but cannot be attacked because not on the ally ArrayList
						}
					} else if (!horitargets.isEmpty()) { //move towards nearby pets
//						System.out.println("pathing to nearby player unit");
						ArrayList<int[]> otp=bm.findOneTilePath(chosen.getLocation(), horitargets.get(0).getLocation());
						if (otp.size()>0)
							bm.movePet(chosen, otp.get(0));
						//remember onetilepath returns a list of potential paths so I take the first one
					} else {
						//third highest priority:
						//if there is a village in the 3 rows centered on foe
						//move down, prioritizing rows with villages in them
						int seekvillage=bm.checkVillageInAdjColumn(chosen.getLocation());
						if (seekvillage>0){
							//when there's only 1 path down, why choose? only go deeper into logic if there are multiple options,
							//and one would lead the pet out of the path of villages
							ArrayList<int[]>path=bm.findOneTilePath(chosen.getLocation(), new int[]{chosen.getLocation()[0],chosen.getLocation()[1]+2});
							if (path.size()==1){
								bm.movePet(chosen, path.get(0));							
							} else {
								int [] idealmoves=null;
								if (seekvillage==1){
									idealmoves=new int[]{chosen.getLocation()[0]-1,chosen.getLocation()[1]+2};
								} else if (seekvillage==2){
									idealmoves=new int[]{chosen.getLocation()[0],chosen.getLocation()[1]+2};
								} else if (seekvillage==3){
									idealmoves=new int[]{chosen.getLocation()[0]+1,chosen.getLocation()[1]+2};
								} else {
									idealmoves=new int[]{};
									System.out.println("village search error");
								}

								if (idealmoves.length>0){
//									System.out.println(chosen.getLocation()[0]+","+chosen.getLocation()[1]+" d:"+idealmoves[0]+","+idealmoves[1]);
									path=bm.findOneTilePath(chosen.getLocation(), idealmoves);
									if (path.size()>0){
										bm.movePet(chosen, path.get(0));
//										System.out.println(chosen.getLocation()[0]+","+chosen.getLocation()[1]+" d:"+idealmoves[0]+","+idealmoves[1]);								
									} else {
										System.out.println(chosen.name+" failed to move...");
									}
								} else {
									//naive movedown
									ArrayList<MeriTile>below=bm.getAdjBelow(chosen.getLocation()[0], chosen.getLocation()[1]);
									for (int j=0;j<below.size();j++){
										if (below.get(i).checkPassable()){
											bm.movePet(chosen, new int[]{below.get(i).getGridx(),below.get(i).getGridy()});
											break;
										}
									}
								}
							}
						} else {
							System.out.println("failed"+seekvillage+"/"+chosen.getLocation()[0]+","+chosen.getLocation()[1]);
							/*final priority: greedy move to column with nearest village?
							 * move to row 5 if not in row 5
							 * find column with nearest village, then move in that direction
							 */
							//move to row 6
							if (chosen.getLocation()[1]<6){
								ArrayList<int[]>path=bm.findOneTilePath(chosen.getLocation(), new int[]{chosen.getLocation()[0],chosen.getLocation()[1]+2});
								if (path.size()>0){
									bm.movePet(chosen, path.get(0));								
								}
							} else if (chosen.getLocation()[1]>7){
								//hack to get people out of the bottom rows if there are no villages nearby
								ArrayList<int[]>path=bm.findOneTilePath(chosen.getLocation(), new int[]{chosen.getLocation()[0],chosen.getLocation()[1]-2});
								if (path.size()>0){
									System.out.println(chosen.name+" somehow reached the bottom");
									bm.movePet(chosen, path.get(0));								
								}					
							} else {
								//find nearest column with village and move in that direction
								int direction=bm.getNearestColumnMultiplier(chosen.getLocation()[0]);
								if (direction==1 || direction==-1){
									ArrayList<MeriTile>path=bm.getAdjBelow(chosen.getLocation()[0],chosen.getLocation()[1],direction);
									if (path.size()>0){
										bm.movePet(chosen, new int[]{path.get(0).getGridx(),path.get(0).getGridy()});								
									}
								}
							}
						}
					}
				}
			}
		}
		if (slainallies.size()>0){
			foe.addAll(slainallies);
		}
		bm.updatePetLocations(getPetLocations());
		update();
		System.out.println("AI process terminated");
	}
	/**
	 * call this after a move is registered in the battlemap
	 * decrements the movesleft (unless special move is made)
	 * decrements selected's moves (unless special move is made)
	 * 
	 * consider passing a parameter: whether the action consumes a pet's moves
	 */
	public void resolvePlayerMove (){
		for (int i=0;i<foe.size();i++){
			if (foe.get(i).checkDead()){
				MeriPet convert=foe.get(i).convert();
				if (convert!=null){
					updateBattleLog(convert.name+" has been freed from darkness!");
					ally.add(convert);
				} else {
					updateBattleLog("Defeated, "+foe.get(i).name+" roars as it is banished from your dimension!");
					bm.setTerrain(foe.get(i).getLocation(), MConst.CRATER);
				}
				boolean notPromoted=!selected.promoted;
				selected.gainSave(campaign.getWave());
				if (notPromoted && selected.promoted){
					updateBattleLog(selected.name+" shouts triumphantly: 'I've gained a promotion!'");
				}
				foe.remove(i);
			}
		}
		selected.moveOnce();//CHECK FOR SPECIAL CASES
		setSelected(null);
		reduceMoves(-1);
		update();
	}
	/**
	 * Turn off the map
	 * advance the campaign counter
	 * 
	 * If the game is won, show the victory screen
	 */
	public void resolveGame(){
		if (campaign.checkCampaignComplete()){
			displayVictoryPanel();
		} else {
			toggleActive();
			campaign.allies=ally;
			campaign.advance();
			if (campaign.currentBattle==0){
				for (int i=0;i<ally.size();i++){
					ally.get(i).promoted=false;
				}
			}
		}
	}
	/**
	 * When altering movesLeft, makes sure illegal values are not saved
	 */
	public void reduceMoves(int change){
		movesLeft+=change;
		if (movesLeft<0 || movesLeft>MAX_MOVES){
			if (movesLeft<0){
				movesLeft=0;
			} else {
				movesLeft=MAX_MOVES;
			}
		}
	}
	/**
	 * Use this to turn off the battlemap/unit list
	 * and display the hidden panel: the unit select panel
	 */
	public void toggleActive (){
		if (ip!=null){
			remove(ip);
			ip=null;
		}
		if (victory){
			remove(fwp);
		}
		
		GridBagConstraints c=new GridBagConstraints();
		c.weightx=0.5;
		c.fill=GridBagConstraints.BOTH;

		if (battlemode){
			battlemode=false;
			remove(bm);
			remove(um);
			remove(im);
			remove(bl);

			sp=new SelectParty();
			c.gridx=0;
			c.gridy=0;
			c.gridheight=GridBagConstraints.RELATIVE;
			add(sp,c);
		} else {
			battlemode=true;
			if (sp!=null)
				remove(sp);

			bm=new BattleMap(this);
			c.gridx=0;
			c.gridy=0;
			c.gridheight=GridBagConstraints.RELATIVE;
			add(bm,c);

			um=new UnitDisplay();
			c.gridx=1;
			c.gridy=0;
			c.gridheight=GridBagConstraints.REMAINDER;
			add (um,c);

			im=new InfoDisplay();
			c.gridx=0;
			c.gridy=1;
			c.gridheight=1;
			add(im,c);

			bl=new BattleLog();
			c.gridx=1;
			c.gridy=1;
			c.gridheight=GridBagConstraints.REMAINDER;
			add(bl,c);
		}
		revalidate();
		repaint();
	}
	/**
	 * Remove the other panels and display the victory screen
	 */
	public void displayVictoryPanel(){
		victory=true;
		if (battlemode){
			battlemode=false;
			remove(bm);
			remove(um);
			remove(im);
			remove(bl);
		} else {
			if (sp!=null)
				remove(sp);
		}
		fwp=new FireworkPanel();
	    fwp.setHeader("Campaign Victory!");
	    fwp.setText(new String []
	    		{"The last battle has been won, and the war is over.",
					"Meridor still stands, and its citizens are safe.",
					"Now it is time for brave warriors to lay down arms and take up plows",
					"Until darkness once again threatens Meridor's bright hills.",
					"",
					"You are victorious!"
	    		});
	    fwp.setPreferredSize(initSize);
		GridBagConstraints c=new GridBagConstraints();
		c.weightx=0.5;
		c.fill=GridBagConstraints.BOTH;
		c.gridx=0;
		c.gridy=0;
		c.gridheight=GridBagConstraints.REMAINDER;
		add (fwp,c);
		fwp.setVisible(true);
		fwp.revalidate();
		fwp.repaint();
		revalidate();
		repaint();
	}
	/**
	 * Intended to return combined list of allies and foes
	 */
	public ArrayList<MeriPet> getPetLocations(){
		ArrayList <MeriPet> combined=new ArrayList<MeriPet>();
		combined.addAll(ally);
		combined.addAll(foe);
		return combined;
	}
	/**
	 * The table that displays unit stats during battle
	 * hide when out of battle
	 */
	private class UnitDisplay extends JPanel {

		JTable allytable, foetable;

		final private String[] ALLYCOLS={
				"","Name/Rank","Health","Attack","","Defence","","Saves"	
		};
		final private String[] FOECOLS={
				"","Name","Health","Attack","","Defence","",""	
		};

		private UnitDisplay(){
			setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED));
			updateAllyData();
			updateFoeData();
			JScrollPane jspA=new JScrollPane(allytable);
			JScrollPane jspF=new JScrollPane(foetable);
			add(jspA);
			add(jspF);
			allytable.setFillsViewportHeight(true);
			foetable.setFillsViewportHeight(true);

			setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
			setPreferredSize(new Dimension(400,400));
		}
		/**
		 * Updates every tick and on init
		 * may need to adjust weapon name length
		 */
		public void updateAllyData(){
			Object[][]allies=new Object[ally.size()][];
			for (int i=0;i<ally.size();i++){
				Object[]mstats=new Object[8];
				mstats[0]=MConst.imageIconMap.get(ally.get(i).getSpeciesID());
				mstats[1]=ally.get(i).getNameNRank();
				mstats[2]=ally.get(i).getDmgNHealth();
				mstats[3]=ally.get(i).getAttackString();
				mstats[4]=MConst.imageIconMap.get(ally.get(i).weapon);
				mstats[5]=ally.get(i).getDefenseString();
				mstats[6]=MConst.imageIconMap.get(ally.get(i).armor);
				mstats[7]=ally.get(i).getSavesString();
				allies[i]=mstats;
			}
			DefaultTableModel sdtm=new DefaultTableModel(allies,ALLYCOLS){
				@SuppressWarnings({ "unchecked", "rawtypes" })
				public Class getColumnClass(int c){
					return getValueAt(0,c).getClass();
				}
			};
			allytable=new JTable(sdtm){
				public String getToolTipText(MouseEvent e){
					String text=null;
					java.awt.Point p = e.getPoint();
					int rowIndex=rowAtPoint(p);
					int colIndex=columnAtPoint(p);
					
					try {
						if (colIndex==0 && ally !=null && ally.size()>rowIndex){
							text=(ally.get(rowIndex).getSpeciesName());
						}
						else if (colIndex==4 && ally !=null && ally.size()>rowIndex){
							text=MConst.getEquipToolTipStats(ally.get(rowIndex).weapon);
						}
						else if (colIndex==6 && ally !=null && ally.size()>rowIndex){
							text=MConst.getEquipToolTipStats(ally.get(rowIndex).armor);
						}
					} catch (RuntimeException e1){
//						System.out.println("Tooltip error");
					}
					return text;
				}
			};
			allytable.setRowHeight(30);
			allytable.getColumnModel().getColumn(0).setPreferredWidth(34);
			allytable.getColumnModel().getColumn(1).setPreferredWidth(190);
			allytable.getColumnModel().getColumn(4).setPreferredWidth(38);
			allytable.getColumnModel().getColumn(6).setPreferredWidth(38);
			allytable.getTableHeader().setReorderingAllowed(false);
			allytable.getTableHeader().setResizingAllowed(false);
			allytable.setEnabled(false); //not ideal, fix later
		}
		/**
		 * Updates every tick and on init
		 * may need to adjust weapon name length
		 */
		public void updateFoeData(){
			Object[][]foes=new Object[foe.size()][];
			for (int i=0;i<foe.size();i++){
				Object[]mstats=new Object[8];
				mstats[0]=MConst.imageIconMap.get(foe.get(i).getSpeciesID());
				mstats[1]=foe.get(i).name;
				mstats[2]=foe.get(i).getCurrHealth()+"";
				mstats[3]=foe.get(i).getAttackString();
				mstats[4]="";
				mstats[5]=foe.get(i).getDefenseString();
				mstats[6]="";
				mstats[7]="";
				foes[i]=mstats;
			}
			DefaultTableModel sdtm=new DefaultTableModel(foes,FOECOLS){
				public Class getColumnClass(int c){
					return getValueAt(0,c).getClass();
				}
			};
			foetable=new JTable(sdtm){
				public String getToolTipText(MouseEvent e){
					String text=null;
					java.awt.Point p = e.getPoint();
					int rowIndex=rowAtPoint(p);
					int colIndex=columnAtPoint(p);
					
					try {
						if (colIndex==0 && foe !=null && foe.size()>rowIndex){
							text=(foe.get(rowIndex).getSpeciesName());
						}
					} catch (RuntimeException e1){
//						System.out.println("Tooltip error");
					}
					return text;
				}
			};
			foetable.setRowHeight(30);
			foetable.getColumnModel().getColumn(0).setPreferredWidth(34);
			foetable.getColumnModel().getColumn(1).setPreferredWidth(190);
			foetable.getColumnModel().getColumn(4).setPreferredWidth(38);
			foetable.getColumnModel().getColumn(6).setPreferredWidth(38);
			foetable.getTableHeader().setReorderingAllowed(false);
			foetable.getTableHeader().setResizingAllowed(false);
			foetable.setEnabled(false);
		}

		public void paintComponent(Graphics g){
			super.paintComponent(g);
			updateAllyData();
			updateFoeData();
		}
	}
	/**
	 * For editing the team out of battle
	 * 2 jtables side by side?
	 * 
	 * take info in the ally array and split it out
	 * two tables, one for name/select, one for stats
	 */
	private class SelectParty extends JPanel implements ActionListener, TableModelListener {

		final private String[] STATCOLS={
				"Name","Selected","","Rank","Health","Attack","","Defence","","Saves"	
		};

		JLabel shieldicon,shieldtitle;
		JButton confirmteam;
		JTable selector;
		Object[][]allyname;
		boolean[]petchosen; //implementing this the HARD WAY: keeping a separate array to store selected status

		private SelectParty (){
			setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
			setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED));
			JPanel toppanel=new JPanel();
			JPanel bottompanel=new JPanel();
			
			bottompanel.setLayout(new BoxLayout(bottompanel, BoxLayout.Y_AXIS));
			bottompanel.setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED));
			bottompanel.setBackground(Color.white);
			shieldicon=new JLabel(new ImageIcon(MConst.shieldMap.get(MConst.SHIELDTITLES[0])));
			shieldtitle=new JLabel(MConst.SHIELDTITLES[0]);
			
			confirmteam=new JButton("Confirm Team Selection");
			confirmteam.addActionListener(this);
			confirmteam.setMnemonic(KeyEvent.VK_C);
			bottompanel.add (shieldicon);
			shieldicon.setAlignmentX(Component.CENTER_ALIGNMENT);
			bottompanel.add (shieldtitle);
			shieldtitle.setAlignmentX(Component.CENTER_ALIGNMENT);
			bottompanel.add(confirmteam);
			confirmteam.setAlignmentX(Component.CENTER_ALIGNMENT);
			
			JLabel spinstruction=new JLabel("Only the selected (checked) pets will go to the next mission (Max 5). Unselected pets will return to their families.");
			JLabel rninstruction=new JLabel("Doubleclick a pet's name to rename it.");

			updateStatData();
			JScrollPane jspA=new JScrollPane(selector);
			toppanel.add(jspA);
			selector.setFillsViewportHeight(true);

			toppanel.setLayout(new BoxLayout(toppanel, BoxLayout.Y_AXIS));
			
			add (spinstruction);
			add (rninstruction);
			add (toppanel);
			bottompanel.setAlignmentX(Component.CENTER_ALIGNMENT);
			add (Box.createHorizontalGlue());
			add (Box.createHorizontalGlue());
			add (Box.createHorizontalGlue());
			add (Box.createHorizontalGlue());
			add (Box.createHorizontalGlue());
			add (Box.createHorizontalGlue());
			add (Box.createHorizontalGlue());
			add (bottompanel);
			


			setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
			setPreferredSize(initSize);
		}
		/**
		 * Updates every tick and on init
		 * may need to adjust weapon name length
		 */
		public void updateStatData(){
			int titleindex=campaign.currentScenario+0; //needs to be changed to a get
			if (titleindex==0)
				titleindex+=campaign.currentBattle;
			else
				titleindex+=2;

			shieldicon.setIcon(new ImageIcon(MConst.shieldMap.get(MConst.SHIELDTITLES[titleindex])));
			shieldtitle.setText(MConst.SHIELDTITLES[titleindex]);
			
			allyname=new Object[ally.size()][];
			petchosen=new boolean[ally.size()];
			for (int i=0;i<ally.size();i++){
				Object[]mname=new Object[10];
				mname[0]=ally.get(i).name;
				mname[1]=petchosen[i]=i<5;
				mname[2]=MConst.imageIconMap.get(ally.get(i).getSpeciesID());
				mname[3]=ally.get(i).getRank();
				mname[4]=ally.get(i).getDmgNHealth();
				mname[5]=ally.get(i).getAttackString();
				mname[6]=MConst.imageIconMap.get(ally.get(i).weapon);
				mname[7]=ally.get(i).getDefenseString();
				mname[8]=MConst.imageIconMap.get(ally.get(i).armor);
				mname[9]=ally.get(i).getSavesString();
				allyname[i]=mname;
			}

			DefaultTableModel sdtm=new DefaultTableModel(allyname,STATCOLS){
				public Class getColumnClass(int c){
					return getValueAt(0,c).getClass();
				}
				@Override
				public boolean isCellEditable(int row, int column){
					return column<=1;
				}
			};
			sdtm.addTableModelListener(this);
			selector = new JTable(sdtm){
				public String getToolTipText(MouseEvent e){
					String text=null;
					java.awt.Point p = e.getPoint();
					int rowIndex=rowAtPoint(p);
					int colIndex=columnAtPoint(p);
					try {
						if (colIndex==2 && ally !=null && ally.size()>rowIndex){
							text=(ally.get(rowIndex).getSpeciesName());
						}
						else if (colIndex==6 && ally !=null && ally.size()>rowIndex){
							text=MConst.getEquipToolTipStats(ally.get(rowIndex).weapon);
						}
						else if (colIndex==8 && ally !=null && ally.size()>rowIndex){
							text=MConst.getEquipToolTipStats(ally.get(rowIndex).armor);
						}
					} catch (RuntimeException e1){
//						System.out.println("Tooltip error");
					}
					return text;
				}
			};
			selector.setRowHeight(30);
			selector.getColumnModel().getColumn(0).setPreferredWidth(120);
			selector.getColumnModel().getColumn(2).setPreferredWidth(34);
			selector.getColumnModel().getColumn(6).setPreferredWidth(34);
			selector.getColumnModel().getColumn(8).setPreferredWidth(34);
			selector.getTableHeader().setReorderingAllowed(false);
			selector.getTableHeader().setResizingAllowed(false);
			revalidate();
			repaint();
		}
		/**
		 * Checks to make sure only 5 allies are selected (true)
		 */
		public boolean isPartyValid (){
			int count=0;
			for (int i=0;i<allyname.length;i++){
				if (petchosen[i]){
					count++;
				}
			}
			System.out.println(count);
			return count==5;
		}
		/*
		 *TODO delate this method 
		 */
		public void paintComponent(Graphics g){
			super.paintComponent(g);
//			updateStatData();
		}
		/*
		 * (non-Javadoc)
		 * @see java.awt.event.ActionListener#actionPerformed(java.awt.event.ActionEvent)
		 * 
		 * enforces the five character limit
		 */
		public void actionPerformed(ActionEvent e) {
			if (e.getSource()==confirmteam){
				if (!isPartyValid()){
					JOptionPane.showMessageDialog(null, "You can only bring 5 characters to the next level!");
				} else {
					int choice=JOptionPane.showConfirmDialog(null, "Are you sure you want to bring the selected characters to the next level?", "", JOptionPane.YES_NO_OPTION);
					if (choice==JOptionPane.YES_OPTION){
						ArrayList<MeriPet> ally2=new ArrayList<MeriPet>();
						for (int i=0;i<allyname.length;i++){
							if (petchosen[i]){
								ally2.add(ally.get(i));
							}
						}
						ally=ally2;
						toggleActive();
						initBattleMap();
					}
				}
			}

		}
		@Override
		public void tableChanged(TableModelEvent e) {
			int row=e.getFirstRow();
			int col=e.getColumn();
			if (col==1){
				petchosen[row]=(boolean) ((DefaultTableModel)e.getSource()).getValueAt(row, col);
			} else if (col==0){
				ally.get(row).name=(String)((DefaultTableModel)e.getSource()).getValueAt(row, col);
				campaign.allies.get(row).name=(String)((DefaultTableModel)e.getSource()).getValueAt(row, col);
			}
//			System.out.println(petchosen[row]);
		}
	}
	/**
	 * Displays the results of the latest action
	 */
	private class BattleLog extends JPanel {

		JTextArea text;

		private BattleLog (){
			setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED));
			setLayout(new BorderLayout());
			text=new JTextArea("");
			text.setEditable(false);
			JScrollPane jsp=new JScrollPane(text);

			text.setPreferredSize(new Dimension(500,120));
			jsp.setPreferredSize(text.getPreferredSize());
			add (jsp,BorderLayout.CENTER);
		}
		private void updateText (){
			String blt="";
			for (int i=0;i<battlelogtext.size();i++){
				blt+=battlelogtext.get(i)+"\n";
			}
			text.setText(blt);
			revalidate();
			repaint();
		}
	}

	/**
	 * Displays key information about player stats on screen bottom
	 */
	private class InfoDisplay extends JPanel implements ActionListener{

		JLabel missionlabel, movesleftlabel, villagesleftlabel, treasurefoundlabel,petmaxlabel;
		JButton endturnbutton, deselectbutton;
		ArrayList<JButton>equipinfobuttons;
		ArrayList<Integer>equipsdisplayed;
		JPanel buttonpanel;

		/**
		 *I want to dynamically display the items present on the map
		 *Some other dynamic behavior can be placed here, including current stage
		 */
		private InfoDisplay(){
			setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
			setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED));
			
			JLabel iteminfolabel=new JLabel("Click for item info:");
			equipinfobuttons=new ArrayList<JButton>();
			equipsdisplayed=new ArrayList<Integer>();
			buttonpanel=new JPanel();
			buttonpanel.setPreferredSize(new Dimension(400,50));
			
			treasurefoundlabel=new JLabel("Lost Item Found: ");
			petmaxlabel=new JLabel("Current Pet's Moves:");
			missionlabel=new JLabel("---");
			movesleftlabel=new JLabel("Total Player Moves Left:"+movesLeft+" / "+MAX_MOVES);
			villagesleftlabel=new JLabel("Villages Left:"+villagesLeft);
			endturnbutton=new JButton("End Turn");
			endturnbutton.setMnemonic(KeyEvent.VK_E);
			deselectbutton=new JButton("Unselect Current Pet:");
			deselectbutton.setMnemonic(KeyEvent.VK_U);
			
			endturnbutton.addActionListener(this);
			deselectbutton.addActionListener(this);

			add (missionlabel);
			missionlabel.setAlignmentX(CENTER_ALIGNMENT);
			add(treasurefoundlabel);
			treasurefoundlabel.setAlignmentX(Component.CENTER_ALIGNMENT);
			
			add(iteminfolabel);
			iteminfolabel.setAlignmentX(CENTER_ALIGNMENT);
			add(buttonpanel);
			buttonpanel.setAlignmentX(CENTER_ALIGNMENT);
			
			add(petmaxlabel);
			petmaxlabel.setAlignmentX(Component.CENTER_ALIGNMENT);
			add(movesleftlabel);
			movesleftlabel.setAlignmentX(Component.CENTER_ALIGNMENT);
			add(villagesleftlabel);
			villagesleftlabel.setAlignmentX(Component.CENTER_ALIGNMENT);
			add(endturnbutton);
			endturnbutton.setAlignmentX(Component.CENTER_ALIGNMENT);
			add(deselectbutton);
			deselectbutton.setAlignmentX(Component.CENTER_ALIGNMENT);
		}
		public void updateEquipDisplay(){
			equipinfobuttons.clear();
			buttonpanel.removeAll();
			equipsdisplayed=bm.getEquipIDs();
			for (int i=0;i<equipsdisplayed.size();i++){
				equipinfobuttons.add(new JButton(MConst.imageIconMap.get(equipsdisplayed.get(i))));
				equipinfobuttons.get(i).addActionListener(this);
				buttonpanel.add (equipinfobuttons.get(i));
			}
		}
		public void updateMissionTitle(){
			missionlabel.setText(campaign.getMissionNScenarioNames());
			updateTreasureFound();
		}
		/**
		 * indicates if the treasure has been found in the current mission
		 */
		public void updateTreasureFound(){
			if (campaign.treasureCollected){
				treasurefoundlabel.setText("Lost Item Found: Yes");
			} else {
				treasurefoundlabel.setText("Lost Item Found: No");
			}
		}
		public void updatePetMaxMoves(){
			if (selected!=null){
				petmaxlabel.setText("Current Pet's Moves: "+selected.moves+" / "+selected.getMaxMove());
			} else{
				petmaxlabel.setText("Selected Pet's Moves: ");
			}
		}
		/**
		 * Call this after each player move (in battlemap, most likely)
		 */
		public void updateMovesLeft(){
			movesleftlabel.setText("Total Player Moves Left:"+movesLeft);
		}
		/**
		 * Call this after each player move (in battlemap, most likely)
		 */
		public void updateVillagesLeft(){
			villagesleftlabel.setText("Villages Left:"+villagesLeft);
		}
		public void updateDeselect(){
			if (selected==null){
				deselectbutton.setText("Unselect Current Pet:");
			} else {
				deselectbutton.setText("Unselect Current Pet:"+selected.name);
			}
		}
		@Override
		public void actionPerformed(ActionEvent e) {
			if (e.getSource()==endturnbutton && campaign!=null && !checkGameLost()){
				if (checkGameWon()){
					resolveGame();
				} else {
					int choice=JOptionPane.showConfirmDialog(null, "Are you sure you want to end your turn?", "", JOptionPane.YES_NO_OPTION);
					if (choice==JOptionPane.YES_OPTION){
						setSelected(null);
						updateBattleLog("Enemy Phase!");
						processFoeTurn();
						refreshAllyMove();
						updateVillagesLeft();
						updateBattleLog("Turn "+(++turnCount));
					}
				}
			}
			if (e.getSource()==deselectbutton){
				setSelected(null);
			} else {
				for (int i=0;i<equipinfobuttons.size();i++){
					if (e.getSource()==equipinfobuttons.get(i)){
						selectedEquipID=equipsdisplayed.get(i);
						ei.updateEquipInfo();
					}
				}
			}
		}
	}
	
	private class EquipInfo extends JFrame implements ActionListener{
		
		/**
		 * item icon
		 * text
		 */
		private JLabel itemIcon, itemName, normalAbonus,normalDbonus,speciesbonus;
		private JTextArea itemDesc;
		private JButton itemClose;
		private final String ATTACKBASE="Attack Bonus: +";
		private final String DEFENSEBASE="Defense Bonus: +";
		private final String SBBASE="In the hands of a ";
		
		public EquipInfo(){
			setLayout(new BorderLayout());
			JPanel inner=new JPanel();
			inner.setLayout(new BoxLayout(inner, BoxLayout.Y_AXIS));
			inner.setBackground(Color.white);
			JPanel title=new JPanel();
			title.setBackground(Color.white);
			title.setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED));
			JPanel bottom=new JPanel();
			bottom.setLayout(new BorderLayout());
			bottom.setBackground(Color.white);
			bottom.setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED));
			JPanel holder=new JPanel();
			holder.setLayout(new BoxLayout(holder, BoxLayout.Y_AXIS));
			holder.setBackground(Color.white);
			
			itemIcon=new JLabel(MConst.imageIconMap.get(-1));
			itemIcon.setAlignmentX(Component.LEFT_ALIGNMENT);
			itemName=new JLabel("");
			itemName.setAlignmentX(Component.LEFT_ALIGNMENT);
			
			itemDesc=new JTextArea("\n\n\n\n\n");
			itemDesc.setLineWrap(true);
			itemDesc.setWrapStyleWord(true);
			itemDesc.setEditable(false);
			itemDesc.setPreferredSize(new Dimension(250,150));
			itemDesc.setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED));
			normalAbonus=new JLabel(ATTACKBASE);
			normalAbonus.setAlignmentX(Component.LEFT_ALIGNMENT);
			normalAbonus.setHorizontalAlignment(JLabel.LEFT);
			normalDbonus=new JLabel(DEFENSEBASE);
			normalDbonus.setAlignmentX(Component.LEFT_ALIGNMENT);
			normalDbonus.setHorizontalAlignment(JLabel.LEFT);
			speciesbonus=new JLabel(SBBASE);
			speciesbonus.setAlignmentX(Component.LEFT_ALIGNMENT);
			speciesbonus.setHorizontalAlignment(JLabel.LEFT);
			itemClose=new JButton("Close");
			itemClose.addActionListener(this);
			itemClose.setAlignmentX(Component.LEFT_ALIGNMENT);
			itemClose.setHorizontalAlignment(JLabel.LEFT);
			
			title.add(itemIcon);
			title.add(itemName);
			
			inner.add(title);
			inner.add(itemDesc);
			holder.add(normalAbonus);
			holder.add(normalDbonus);
			holder.add(speciesbonus);
			holder.add(itemClose);
			bottom.add(holder,BorderLayout.CENTER);
			inner.add(bottom);
			add(inner,BorderLayout.CENTER);
			
			setTitle("Equipment Info");
			setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);
			pack();
			setVisible(false);
			this.setResizable(false);
		}
		public void updateEquipInfo(){
			if (MConst.isWeapon(selectedEquipID) || MConst.isArmor(selectedEquipID)){
				Equip equip=MConst.equipMap.get(selectedEquipID);
				int ab=equip.getAtkBonus(-1);
				int db=equip.getDefBonus(-1);
				int spab=equip.getAtkBonus(equip.getBonusSpecies());
				int spdb=equip.getDefBonus(equip.getBonusSpecies());
				
				itemIcon.setIcon(MConst.imageIconMap.get(selectedEquipID));
				itemName.setText(equip.name);
				itemDesc.setText(equip.getDesc());
				normalAbonus.setText(ATTACKBASE+ab);
				normalDbonus.setText(DEFENSEBASE+db);
				if (spab>ab){
					speciesbonus.setText(SBBASE+MeriPet.getSpeciesName(equip.getBonusSpecies())+": +"+spab);
				} else if (spdb>db){
					speciesbonus.setText(SBBASE+MeriPet.getSpeciesName(equip.getBonusSpecies())+": +"+spdb);
				} else {
					speciesbonus.setText("");
				}
				setVisible(true);
			} else {
				setVisible(false);
			}
		}
		@Override
		public void actionPerformed(ActionEvent event) {
			if (event.getSource()==itemClose){
				setVisible(false);
			}
		}
	}
	/**
	 * TODO make this its own class; this is why I preserve the unused instance variable parent
	 * @author Lim
	 *
	 */
	private class VictoryPanel extends JPanel{
		
		private JPanel parent;
		
		private VictoryPanel(JPanel parent){
			this.parent=parent;
		}
		public Dimension getPreferredSize(){
			return initSize;
		}
		public void paintComponent(Graphics g){
			super.paintComponent(g);
			setPreferredSize(initSize);
			setBackground(Color.white);
			//draw pictures here
			Font vfont=new Font("Castellar", Font.BOLD, 60);
			FontMetrics fm=g.getFontMetrics(vfont);
			String victext="Defense of Meridor Complete!";
			String [] victext2=new String []{"The last battle has been won, and the war is over.",
					"Meridor still stands, and its citizens are safe.",
					"Now it is time for brave warriors to lay down arms and take up plows",
					"Until darkness once again threatens Meridor's bright hills.",
					"",
					"You are victorious!"};
			int x=(getWidth()-fm.stringWidth(victext))/2;
			int y=(fm.getHeight())*2;
			g.setColor(Color.black);
			g.setFont(vfont);
			g.drawString(victext, x, y);
			g.setFont(new Font("Castellar", Font.BOLD, 14));
			for (int i=0;i<victext2.length;i++){
				g.drawString(victext2[i], x, y + (i+1)* (g.getFontMetrics(g.getFont()).getHeight()+ 4));				
			}
		}
	}
	/**
	 * Displays a shield when starting
	 */
	private class IntroPanel extends JPanel implements MouseMotionListener, MouseListener {
		
		private boolean clicked=false;
		
		public IntroPanel(){
			addMouseMotionListener(this);
			addMouseListener(this);
		}
		/**
		 * Note that this method determines the size of the application
		 * (non-Javadoc)
		 * @see javax.swing.JComponent#getPreferredSize()
		 */
		public Dimension getPreferredSize(){
			return initSize;
		}
		public void paintComponent(Graphics g){
			super.paintComponent(g);
			setPreferredSize(initSize);
			if (MConst.titleshield!=null){
				setBackground(Color.white);
				int xoffset=MConst.titleshield.getWidth()/2;
				int yoffset=MConst.titleshield.getHeight()/2;
				g.drawImage(MConst.titleshield, getWidth()/2-xoffset, getHeight()/2-yoffset, null);
				g.setColor(Color.RED);
				g.setFont(new Font("Segoe Script", Font.BOLD, 18));
				g.drawString("Welcome to Defense of Meridor!", 20, 20);
				g.drawString("Click to start!", 20, 50);
				g.drawString("You can also start the game by selecting File->' New ', or ' Load ' a preexisting save.", 20, 80);
			}
		}
		@Override
		public void mouseDragged(MouseEvent arg0) {
			// TODO Auto-generated method stub
			
		}
		@Override
		public void mouseMoved(MouseEvent arg0) {
			// TODO Auto-generated method stub
			setToolTipText("Click anywhere to start! Or, 'Load' a preexisting save!");
		}
		@Override
		public void mouseClicked(MouseEvent arg0) {
			// TODO Auto-generated method stub
		}
		@Override
		public void mouseEntered(MouseEvent arg0) {
			// TODO Auto-generated method stub
			
		}
		@Override
		public void mouseExited(MouseEvent arg0) {
			// TODO Auto-generated method stub
			
		}
		@Override
		public void mousePressed(MouseEvent arg0) {
			// TODO Auto-generated method stub
			
		}
		@Override
		public void mouseReleased(MouseEvent e) {
			// TODO Auto-generated method stub
			if (!clicked){
				clicked=true;
				startNewCampaign();
			}
		}
	}
}
