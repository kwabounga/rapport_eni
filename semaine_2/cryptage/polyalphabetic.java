package cryptage;

import Outils.Pratique;
import Outils.textRefact;

public class polyalphabetic {
	public static char[] ALPHABET = {'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9',' ','É','È','À','Ù','Ç','Ô','Û','Î','Ê','Â','Ö','Ü','Ë','Ä','!','.','/','?','@','-','=','+','%','*','$','&','\'','"'};
	final public static int NB_CHARA = ALPHABET.length;
	public static char[][] convertTab = new char[NB_CHARA][NB_CHARA];
	
	public static String textKey = "JOKER";
	public static String wordToConvert = "jeanyves";
	
	public static void main(String[] args) {
		
		initPolyalphabet();
		
		int choice;
		String txt;
		do {
			System.out.println(textRefact.titleThat("Faire un choix:  (-1 pour quitter)",ALPHABET.length+2));
			System.out.println("1 - encoder une chaine de caractere");
			System.out.println("2 - decoder une chaine de caractere");
			System.out.println("3 - afficher la table de conversion");
			System.out.println("4 - afficher le mot clef");
			System.out.println("5 - changer le mot clef");
			System.out.println(textRefact.line(ALPHABET.length+2));
			choice = Pratique.saisirUnEntier("votre choix");
			
			switch (choice) {
			case 1:
				System.out.println(textRefact.line(ALPHABET.length+2));
				txt = Pratique.saisieClavier("ecrire la phrase à encoder");
//				txt = Pratique.remplacerAccentsParLettres(txt);
				encrypt(txt);
				break;
			case 2:
				System.out.println(textRefact.line(ALPHABET.length+2));
				txt = Pratique.saisieClavier("ecrire la phrase à decoder");
//				txt = Pratique.remplacerAccentsParLettres(txt);
				decrypt(txt);
				break;
			case 3:
				displayPolyAlphabeticTab();
				break;
			case 4:
				System.out.println(textRefact.titleThat("MOT CLEF:", textKey,ALPHABET.length+2));
				break;
			case 5:
				System.out.println(textRefact.titleThat("MOT CLEF:", textKey,ALPHABET.length+2));
				txt = Pratique.saisieClavier("ecrire le nouveau mot clef");
				txt = Pratique.remplacerAccentsParLettres(txt).trim();
				textKey = txt.toUpperCase();
				System.out.println(textRefact.titleThat("NOUVEU MOT CLEF:", textKey,ALPHABET.length+2));
				break;
			case -1:
				System.out.println("Exit.");
				break;
				
			default:
				System.out.println(textRefact.line(ALPHABET.length+2));
				System.out.println(textRefact.textAndWhite("... Erreur Recommencez",ALPHABET.length+2));
				System.out.println(textRefact.line(ALPHABET.length+2));
				break;
			}
			
		} while (choice != -1);
			
		
	}
	
	public static String encrypt(String txt) {
		
		int posK = 0;
		String convertedWord = "";
		for (int i = 0; i < txt.length(); i++) {
			int lttrC = findAlphabetPosition(txt.toUpperCase().charAt(i));
			int lttrK = findAlphabetPosition(textKey.charAt(posK));
//			System.out.println("REAL:" + ALPHABET[lttrC] + " KEY: " + lttrK+ " "+ ALPHABET[lttrK]);
			convertedWord += String.valueOf(convertTab[lttrK][lttrC]);
			posK ++;
			if(posK == textKey.length()){
				posK = 0;
			}
		}
		System.out.print("[ " + txt + " ] >> encryptage >>");
		System.out.println("[ " + convertedWord + " ]");
		return convertedWord;
	}
public static String decrypt(String txt) {
	
//		alphabet.indexOf(String.valueOf(c).toUpperCase());
//		String alphabet = "";
//		for (int i = 0; i < ALPHABET.length; i++) {
//			alphabet += String.valueOf(ALPHABET[i]);
//		}
		int posK = 0;
		String uncryptedWord = "";	
		
		for (int i = 0; i < txt.length(); i++) {
			
			int lttrK = findAlphabetPosition(textKey.charAt(posK));
			String alphacrypt = "";
			for (int j = 0; j < convertTab[lttrK].length; j++) {
				alphacrypt += String.valueOf(convertTab[lttrK][j]);
			}
			int lttrC = alphacrypt.indexOf(txt.charAt(i));
//			convertTab[lttrK];
//			System.out.println("REAL:" + lttrC + " "+ ALPHABET[lttrC] + " KEY: " + lttrK + " "+ ALPHABET[lttrK]);
			uncryptedWord += String.valueOf(convertTab[0][lttrC]);
			posK ++;
			if(posK == textKey.length()){
				posK = 0;
			}
		}
		System.out.print("[ " + txt + " ] >> decryptage >> ");
		System.out.println("[ " + uncryptedWord + " ]");
		return uncryptedWord;
	}
	public static char findPolyAlphabetPosition(char c, char k) {
		int posL = findAlphabetPosition(c);
		int posK = findAlphabetPosition(k);
		return convertTab[posK][posL];
	}
	public static int findAlphabetPosition(char c) {
		String letter = String.valueOf(c).toUpperCase();
		String alphabet = "";
		for (int i = 0; i < ALPHABET.length; i++) {
			alphabet += String.valueOf(ALPHABET[i]);
		}
//		System.out.println(alphabet);
		int posChar = alphabet.indexOf(letter);
//		System.out.println(c + " is at " + posChar);
		return posChar;
		
	}
	public static void initPolyalphabet() {
		convertTab[0] = ALPHABET;
		// TODO Auto-generated method stub
		for (int j = 1; j < NB_CHARA; j++) {
			char[] tmp = new char[NB_CHARA]; 
			for (int i = 0; i < NB_CHARA; i++) {
				if(i<NB_CHARA-1) {
					tmp[i] = convertTab[j-1][i+1];
				}else {
					tmp[i] = convertTab[j-1][0];
				}
			}
			for (int i = 0; i < NB_CHARA; i++) {
				convertTab[j] = tmp;
			}
		}
//		displayPolyAlphabeticTab();
	}

	private static void displayPolyAlphabeticTab() {
		// TODO Auto-generated method stub
		System.out.println(textRefact.line(ALPHABET.length+2));
		for (int j = 0; j < NB_CHARA; j++) {
			String tmp = "";
			for (int i = 0; i < convertTab[j].length; i++) {
//				System.out.print(convertTab[j][i]);
				tmp += convertTab[j][i];
			}
			System.out.println(textRefact.textAndWhite(tmp,ALPHABET.length+2));
//			System.out.println();
		}
		System.out.println(textRefact.line(ALPHABET.length+2));
	}

}
