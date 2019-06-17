package city;

import city.allCitys;
import Outils.Pratique;
import Outils.textRefact;

public class management {
	final static int MAX_RANDOM_LENGTH = 10;
	public static void main(String[] args) {
		
		int choice;
		String set;
		do {
			System.out.println(textRefact.titleThat("Faire un choix:  (-1 pour quitter)"));
			System.out.println("1 - afficher toutes les villes");
			System.out.println("2 - afficher les villes commencant par #");
			System.out.println("3 - afficher le classement des villes par ordre alphabetique");
			System.out.println("4 - ajouter un nombre aleatoire à la fin des villes");
			System.out.println("5 - retirer le nombre aleatoire à la fin des villes");
			System.out.println(textRefact.line());
			choice = Pratique.saisirUnEntier("votre choix");
			System.out.println(textRefact.line());
			
			switch (choice) {
			case 1:
				displayingCity(allCitys.citys);
				break;
			case 2:
				
				System.out.println(textRefact.line());
				set = Pratique.saisieClavier("indiquer un ou une suite de caratere:");
				System.out.println(textRefact.titleThat(set.toUpperCase()));
				displayingCity(sortCity(allCitys.citys, set.toUpperCase()));
				break;
			case 3:
				displayingCity(allCitys.citys, true);
				break;
			case 4:
				addRandomAtEnd(allCitys.citys);
				displayingCity(allCitys.citys);
				break;
			case 5:
				remRandomAtEnd(allCitys.citys);
				displayingCity(allCitys.citys);
				break;

			default:
				if (choice == -1) {
					System.out.println("Exit.");
				}else {
					System.out.println("... Erreur Recommencez");
					
				}
				break;
			}
		} while (choice != -1);
	}
	
	public static void displayingCity(String[] ct, boolean alphabet) {
		String alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for (int i = 0; i < alph.length(); i++) {
			String[] tmp = sortCity(allCitys.citys, String.valueOf(alph.charAt(i)));
			if(tmp.length != 0) {
				System.out.println(textRefact.titleThat(String.valueOf(alph.charAt(i))));
			}
			displayingCity(tmp);
		}
	}
	public static void displayingCity(String[] ct) {
		for (int j = 0; j < ct.length; j++) {
			System.out.println(ct[j]);
		}
	}
	
	public static String[] sortCity(String[] ct, String set) {
		String[] citysTmp = new String[ct.length];
		int nbCitys = 0;
		for (int i = 0; i < set.length(); i++) {
			for (int j = 0; j < ct.length; j++) {
				if (ct[j].toUpperCase().startsWith(String.valueOf(set.toUpperCase().charAt(i)))) {
					citysTmp[nbCitys] = ct[j];
					nbCitys++;
				}
			}			
		}
		String[] citys = new String[nbCitys];
		for (int i = 0; i < citys.length; i++) {
			citys[i] = citysTmp[i];
		}
		return citys;
	}
	
	public static void addRandomAtEnd(String[] ct) {
		for (int i = 0; i < ct.length; i++) {
			String nbrTxt = "";
			for (int j = 0; j < MAX_RANDOM_LENGTH; j++) {
				int tmpInt = (int) Math.floor((Math.random() * MAX_RANDOM_LENGTH));
				nbrTxt += String.valueOf(tmpInt);
			}
			ct[i] = ct[i] + " #" + nbrTxt;
		}
	}
	public static void remRandomAtEnd(String[] ct) {
		for (int i = 0; i < ct.length; i++) {
			String ctTxt = ct[i].split("#")[0].trim();			
			ct[i] = ctTxt;
		}
	}
	
}
