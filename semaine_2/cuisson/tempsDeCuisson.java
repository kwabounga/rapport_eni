/**
 * Pour adapter le temps de cuisson d'une viande a son type et a son poids
 */

package cuisson;

import Outils.Pratique;
/**
 * @author jchaillo2019
 *
 */
	
	public class tempsDeCuisson {
		
		static int viande;
		static int modeDeCuisson;
		static int poidsViandeGr;
		
		static int tempsDeCuissonType;
		static int tempsDeCuissonSec;
		static int poidsType;
		
		final static int viandeBoeuf = 1;
		final static int viandeAgneau = 2;
		
		final static int poidsTypeBoeuf = 500;
		final static int poidsTypeAgneau = 400;
		
		final static int cuissonBleu = 1;
		final static int cuissonAPoint = 2;
		final static int cuissonBienCuit = 3;
		
		final static String[] nomsViandes = new String[2];
		final static String[] nomsCuissons = new String[3];
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		nomsViandes[0] = "Boeuf";
		nomsViandes[1] = "Agneau";
		
		nomsCuissons[0] = "Bleu";
		nomsCuissons[1] = "a point";
		nomsCuissons[2] = "bien cuit";
		
		System.out.println("TP.cuisson.tempsDeCuisson");
		// Récupération du type de viande
		viande = Pratique.saisirUnEntier("veuillez indique le type de viande: 1:Boeuf , 2:Agneau");
		viande = (viande == 1)?1:2;
		System.out.println("vous avez choisi: " + nomsViandes[viande-1]);
		
		// Récupération du poids de la viande
		poidsViandeGr = Pratique.saisirUnEntier("veuillez indique le poids de la viande (gr)");
		System.out.println("vous avez defini le poids de la viande à: " + poidsViandeGr + " gr.");
		
		// Récupération du mode de cuisson
		modeDeCuisson = Pratique.saisirUnEntier("Veuiller indiquer le mode de cuisson désiré: \n 1: " + nomsCuissons[0] + ", 2: " + nomsCuissons[1] + ", 3: " + nomsCuissons[2] );
		if(!Pratique.estComprisEntre( (double)0, (double)3, (double)modeDeCuisson ) ) {
			modeDeCuisson = 3;
		}
		System.out.println("vous avez choisi une cuisson " + nomsCuissons[modeDeCuisson-1]);
		
		switch (viande) {
		case viandeBoeuf:
			poidsType = poidsTypeBoeuf;
			switch (modeDeCuisson) {
				case cuissonBleu:
					tempsDeCuissonType = 10;
					break;
				case cuissonAPoint:
					tempsDeCuissonType = 17;				
					break;
				case cuissonBienCuit:
					tempsDeCuissonType = 25;				
					break;
	
				default:
					System.out.println("Erreur lors de la saisie du mode de cuisson.");	
					break;
			}
			break;
		case viandeAgneau:
			poidsType = poidsTypeAgneau;
			switch (modeDeCuisson) {
			case cuissonBleu:
				tempsDeCuissonType = 15;
				break;
			case cuissonAPoint:
				tempsDeCuissonType = 25;				
				break;
			case cuissonBienCuit:
				tempsDeCuissonType = 40;				
				break;

			default:
				System.out.println("Erreur lors de la saisie du mode de cuisson.");	
				break;
		}
			break;

		default:
			
			System.out.println("Erreur lors de la saisie du type de viande.");	
			break;
		}
		tempsDeCuissonSec = (int) (((poidsViandeGr * tempsDeCuissonType) / (double)poidsType)*60);
		System.out.println(" Vous devriez laisser votre viande pendant " + tempsDeCuissonSec + " secondes");	
		System.out.println("Fin.");
	}

}
