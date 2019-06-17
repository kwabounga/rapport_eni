package words;

import Outils.Pratique;
import Outils.textRefact;

public class shufflizator {
	
	public static void main(String[] args) {
		System.out.println(textRefact.titleThat("[shufflizator, cherche pas t'as tort]"));
		String phrase;
		
		do {
			phrase = String.valueOf(Pratique.saisir("veuillez ecrire votre phrase :   (exit - pour quitter)"));
			if(phrase.equals("exit")) {
				System.out.println(textRefact.line());
				break;
			}else {
				
				System.out.println(textRefact.titleThat("ORIGINAL"));				
				System.out.println(textRefact.line());				
				System.out.println(textRefact.blocThat(phrase));				
				System.out.println(textRefact.line());
				System.out.println(textRefact.titleThat("TRANSFORME"));				
				String sfflTxt = shuffle(phrase);
				System.out.println(textRefact.blocThat(sfflTxt));				
				System.out.println(textRefact.line());
			}						
		} while (!phrase.equals("exit"));
	}

	public static String shuffle(String txt) {
		
//		on découpe le txt avec les espaces
		String newTxt = "";
		String[] arWords = txt.split("\\s");
		String[] arWordsTmp = new String[arWords.length];
		int nbRealsWords = 0;
		// on fait en sorte de virer tout les espaces en trop;
		for (int i = 0; i < arWords.length; i++) {
			arWords[i] = arWords[i].trim();
			if (!arWords[i].equals("")) {
				arWordsTmp[nbRealsWords] = arWords[i];
				nbRealsWords++;
			}
		}

//		recuperation des mots dans un tableau propre
		String[] allWords = new String[nbRealsWords];
		for (int i = 0; i < nbRealsWords; i++) {
			allWords[i] = arWordsTmp[i];
		}

		for (int i = 0; i < allWords.length; i++) {
			if (allWords[i].length() > 3) {
				allWords[i] = shuffleInsideWord(allWords[i], -1);
			}
		}
		for (int i = 0; i < allWords.length; i++) {
			newTxt += allWords[i] + " ";
		}
		
		return newTxt.trim();
	}

	private static String shuffleInsideWord(String txt, int sizeSet) {
		String leftSet = txt.substring(1,txt.length()-1);
		String newSet = String.valueOf(txt.charAt(0));
		int currentIndex = (sizeSet == -1) ? leftSet.length() : sizeSet;
		int randomIndex;
		
		while (0 != currentIndex) {
			randomIndex = (int) Math.floor(Math.random() * leftSet.length());
			currentIndex -= 1;
			String chara = String.valueOf(leftSet.charAt(randomIndex));
			String tmpSet = leftSet.substring(0, randomIndex);
			tmpSet += leftSet.substring(randomIndex + 1, leftSet.length());
			leftSet = tmpSet;
			newSet += chara;
		}
		newSet += String.valueOf(txt.charAt(txt.length()-1));
		return newSet;
	}
}
