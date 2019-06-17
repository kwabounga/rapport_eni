package Outils;

import java.util.Random;
import java.util.Scanner;

/**
 * @since 11/06/2019
 * @see
 * @author vdavid
 * @category Utilitaire
 * @version 1.0
 */
public class Pratique {

	final static Scanner unScanner = new Scanner(System.in);
	
	public static void main(String[] args) {
		// TODO Faire une class de fifou
		
	}
	
	/**
	 * Calculer un nombre aléatoire compris entre
	 * 
	 * @param min : valeur minimale
	 * @param max : valeur maximale
	 * @return : Un nombre aléatoire
	 */
	public static int nombreAleatoire(int min, int max) {
		int result = 0;

		Random r = new Random(); // Randomize
		// Formule mathématique pour obtenir un nb. aléatoire compris entre une valeur
		// mini et une valeur maxi
		result = min + r.nextInt(max + 1 - min);

		return result;
	}

	/**
	 * Afficher un message dans la console
	 * 
	 * @param unMessage
	 */
	public static void afficherMessage(String unMessage) {
		System.out.println(unMessage); // Affichage du texte du message
	}

	/**
	 * 
	 * @param uneErreur
	 */
	public static void afficherErreur(String uneErreur) {
		System.err.println(uneErreur); // Affichage du texte de l'erreur
	}

	/**
	 * Commentaire pour la JavaDoc saisieClavier : Permet de Saisir des informations
	 * depuis le clavier
	 * 
	 * @param unMessage : le message d'invite de saisie
	 * @return : la chaine de caractère saisie par l'utilisateur
	 */
	public static String saisieClavier(String unMessage) {
		String resultat = "rien n'a été saisi";
		afficherMessage(unMessage + " :"); // Affichage du text du message
		resultat = unScanner.nextLine(); // Attente de saisie clavier

		return resultat; // Permet de renvoyer le resultat à l'appelant
	}
	
	/**
	 * saisirUnEntier : Permet de Saisir un entier
	 * depuis le clavier
	 * 
	 * @param unMessage : le message d'invite de saisie
	 * @return : l'entier saisie par l'utilisateur (renvoi nan si la saisie n'est pas un int)
	 */
	public static int saisirUnEntier(String unMessage) {
		int unInt = 0;
		
		try {
			afficherMessage(unMessage + " :"); // Affichage du text du message
			unInt = unScanner.nextInt(); // Attente de saisie clavier
			unScanner.nextLine();// Permet de valier de saisie / Retour Chariot
		} catch (Exception e) {
			unInt = (int)Double.NaN;
			unScanner.nextLine();
		}
		return unInt; // Permet de renvoyer le resultat à l'appelant
	}
	/**
	 * saisirUnEntier : Permet de Saisir un entier
	 * depuis le clavier
	 * 
	 * @param unMessage : le message d'invite de saisie
	 * @return 
	 * @return : l'entier saisie par l'utilisateur (renvoi -1 si la saisie n'est pas un int)
	 */	
	public static Object saisir(String unMessage) {
		Object something = null;
		String userSaisie;
		afficherMessage(unMessage + " :"); // Affichage du text du message
		userSaisie = unScanner.nextLine();
		try {
			something = Integer.parseInt(userSaisie);
//			unScanner.nextLine();// Permet de valider de saisie / Retour Chariot
		} catch (Exception e) {
//			System.out.println("can't convert value to int" + e.getMessage());
			try {
				something = Double.parseDouble(userSaisie);
//				unScanner.nextLine();// Permet de valider de saisie / Retour Chariot
			} catch (Exception er) {
//				System.out.println("can't convert value to double : " + er.getMessage());
				something = userSaisie;
			}
		}		
		return something; // Permet de renvoyer le resultat à l'appelant
	}
	
	/**
	 * saisirUnDecimal : Permet de Saisir un decimal
	 * depuis le clavier
	 * 
	 * @param unMessage : le message d'invite de saisie
	 * @return : le decimal saisie par l'utilisateur (renvoi NaN si la saisie n'est pas bonne)
	 */
	public static double saisirUnDecimal(String unMessage) {
		double unDouble = 0;
		
		try {
			afficherMessage(unMessage + " :"); // Affichage du text du message
			unDouble = unScanner.nextDouble(); // Attente de saisie clavier
			unScanner.nextLine();// Permet de valier de saisie / Retour Chariot
		} catch (Exception e) {
			unDouble = Double.NaN;
			unScanner.nextLine();
		}
		return unDouble; // Permet de renvoyer le resultat à l'appelant
	}

	/**
	 * Supprimer les accents et conserver les lettres
	 * @param uneChaineAccentuee
	 * @return la chaine de caractere sans les accents
	 */
	public static String remplacerAccentsParLettres(String uneChaineAccentuee) {
		final String CARACT_ACCENTS = "ÀÁÂÃÄÅàáâãäåÈÉÊËèéêëïùçÇûüôöûÜÔÖ'"; // A compléter...
		final String CARACT_LETTRES = "AAAAAAaaaaaaEEEEeeeeiucCuuoouUOO"; // A compléter...

		StringBuffer uneChaineSansAccent = new StringBuffer(uneChaineAccentuee);

		for (int i = 0; i < uneChaineAccentuee.length(); i++) {
			// Récupération de la position du caractère dans la liste CARACT_ACCENTS
			int index = CARACT_ACCENTS.indexOf(uneChaineAccentuee.charAt(i));
			if (index >= 0) {
				uneChaineSansAccent.setCharAt(i, CARACT_LETTRES.charAt(index));
			}
		}

		return uneChaineSansAccent.toString();
	}
	
	/**
	 * Permet de Saisir des informations
	 * depuis le clavier
	 * 
	 * @param unMessage : le message d'invite de saisie
	 * @return : la chaine de caractère saisie par l'utilisateur
	 */
	public static boolean estComprisEntre(double min, double max, double value) {
		boolean response = true;
		if(value < min | value > max) {
			response = false;
		}
		return response;
	}
	

}
