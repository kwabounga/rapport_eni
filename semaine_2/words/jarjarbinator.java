package words;

import Outils.Pratique;
import Outils.textRefact;

public class jarjarbinator {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println(textRefact.titleThat("[JArJarBinator, VoussAcherche passa vouss'as tort]"));
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
				System.out.println(textRefact.titleThat("JARJARBINÉ"));				
				String sfflTxt = jarjarLanguage(phrase);
				System.out.println(textRefact.blocThat(sfflTxt));				
				System.out.println(textRefact.line());
			}						
		} while (!phrase.equals("exit"));
	}

	private static String jarjarLanguage(String txt) {
		// TODO Auto-generated method stub

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
			allWords[i] = jarjarThisWord(allWords[i], -1);
		}
		for (int i = 0; i < allWords.length; i++) {
			newTxt += allWords[i] + " ";
		}
		
		return newTxt.trim();
	}

	private static String jarjarThisWord(String word, int i) {
		// TODO Auto-generated method stub
		String tmp;
		switch (word.toLowerCase()) {
		case "je":
				tmp = "Missa";
				break;
		case "tu":
				tmp = "tyssa";
				break;
		case "il":
		case "elle":
		case "vous":
		case "nous":
		case "ou":
		case "si":
				tmp = word + "ssa";
				break;
		case "est":
		case "suis":
		case "sommes":
		case "etes":
		case "sont":
			tmp = "être";
			break;
		case "as":
		case "a":
		case "aurai":
		case "ai":
			tmp = "avoir";
			break;
		case "un":
		case "une":
			tmp = "ouna";
			break;
		case "le":
		case "la":
		case "les":
			tmp = "lessa";
			break;
		case "ne":
		case "na":
			tmp = "nonon";
			break;
		case "pas":
			tmp = "oh'non";
			break;
		case "de":
		case "des":
			tmp = "di";
			break;
		case "où":
			tmp = "chépaoùssa";
			break;
		case "non":
			tmp = "assa non ssa";
			break;
		case "oui":
			tmp = "ouissa";
		case "dans":
			tmp = "dedanssa";
			break;
		case "ce":
			tmp = "Ssuila";
			break;
		case "cette":
			tmp = "Ssell'la";
			break;
		case "ok":
		case "okey":
			tmp = "okey avec ssa";
			break;			
					

		default:
			if (word.charAt(word.length()-1) == '.') {
				tmp = word.replace(".", "") + "ssa.";
            }else if (word.charAt(word.length()-1) == '?'&& word.length() > 4) {
				tmp = word.replace("?", "") + "ssala?";
            
			}else if (word.charAt(word.length()-1) == ',' && word.length() > 4) {
				tmp = word.replace(",", "") + "ssa,";
				
			}else{            	
				tmp = word;
			}
			break;
		}
		if(tmp.length() > 8 && !tmp.contains("ssa.") && !tmp.contains("ssa,") && !tmp.contains(" ")) {
			tmp = tmp + "ssa";
		}
		return tmp;
	}

}
