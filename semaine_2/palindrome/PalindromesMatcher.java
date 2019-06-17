package palindrome;

import Outils.Pratique;

public class PalindromesMatcher {

	public static void main(String[] args) {
		String phrase;
		do {
			phrase = String.valueOf(Pratique.saisir("veuillez ecrire votre phrase et appuyer sur [Enter] \n taper exit pour sortir"));
			if(phrase.equals("exit")) {
				break;
			}			
			if(palindromizator(phrase)) {
				System.out.println(phrase + " est un palindrome");
			}else{
				System.out.println(phrase + " n'est pas  un palindrome");
			}
		} while (!phrase.equals("exit"));
		System.out.println("Fin.");
	}
	public static boolean palindromizator(String txt) {
		boolean rep = true;
		String temp = txt;
		temp = txt.replaceAll("\\s+", "");
		temp = Pratique.remplacerAccentsParLettres(temp);
		String[] arTemp = temp.split("");
		int halfSize = (int)(arTemp.length / 2);
		
		for (int i = 0; i < halfSize; i++) {
			if(arTemp[i].equalsIgnoreCase(arTemp[(arTemp.length-1)-i])) {
				rep = true;
				
			}else {
				rep = false;
				break;
			}
			
		}
		
		return rep;
	}
}
