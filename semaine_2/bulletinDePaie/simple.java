package bulletinDePaie;


import Outils.Pratique;

public class simple {

	
	static String nom;  
	static String prenom;  
	static int statut;
	static int nbHeuresTravaille;  
	static double tauxHoraire;
	static int nombreEnfants;
	
	final static int ID_ASERVICE = 1;
	final static int ID_EBUREAU = 2;
	final static int ID_CADRE = 3;
	
	 static String statutTexte;
	 final static String STAT_ASERVICE  = "Agent de service";
	 final static String STAT_EBUREAU  = "Employé de bureau";
	 final static String STAT_CADRE  = "Cadre";
	
	 final static int H_BASE  = 169;
	 final static int  H_MAJOR  = 11;
	
	 static int nbHeureRestantes  = 0;
	
	 static int nbHNormal  = 0;
	 static int nbHMajor  = 0;
	 static int nbHMajorPlus  = 0;
	 static double salaireBrut;
	
	 final static double COTI_SOC_GEN_IMP  = 3.49;
	 final static double COTI_SOC_GEN_NON_IMP  = 6.15;
	 final static double COTI_ASS_MALADIE  = 0.95;
	 final static double COTI_ASS_VIEILLESSE  = 8.44;
	 final static double COTI_ASS_CHOMAGE  = 3.05;
	 final static double COTI_RETRAIT_COMP  = 3.81;
	 final static double COTI_AGFF  = 1.02;
	
	 static double totalCotisation;  
	 static double salaireNet; 
	 static int primeFamiliale; 
	 
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		nom = giveLName();
		
		prenom = giveFName();
		statut = giveStatut();
		nbHeuresTravaille = giveHoursWork();
		tauxHoraire = giveTimeValue();		
		nombreEnfants = giveNbChildren();
		
		calculateBrut();
		calculateNet();
		calculatePrime();
		
	}
	
	public static void calculateNet() {
		System.out.println("Salaire Brut : " + salaireBrut  + "€ ");
		System.out.println(nbHNormal + "h  sans majoration");
		System.out.println(nbHMajor + "h avec une majoration de 50%");
		System.out.println(nbHMajorPlus + "h avec une majoration de 60%");
		
		// Cotisations;
		System.out.println("Calcul des cotisations:");
		System.out.println("- Contribution pour le remboursement de la dette sociale et contribution sociale généralisée imposable");
		// 1966,64 € × 3,49 % = 68,64 €;
		System.out.println( salaireBrut + "€ x " + COTI_SOC_GEN_IMP + " % = " + (salaireBrut * COTI_SOC_GEN_IMP)/100  + " €");
		totalCotisation = (salaireBrut * COTI_SOC_GEN_IMP)/100;
		
		System.out.println("- Contribution sociale généralisée non imposable");
		System.out.println( salaireBrut + "€ x " + COTI_SOC_GEN_NON_IMP + " % = " + (salaireBrut * COTI_SOC_GEN_NON_IMP)/100  + " €");
		totalCotisation = totalCotisation + (salaireBrut * COTI_SOC_GEN_NON_IMP)/100;
		
		System.out.println("- Assurance maladie");
		System.out.println( salaireBrut + "€ x " + COTI_ASS_MALADIE + " % = " + (salaireBrut * COTI_ASS_MALADIE)/100  + " €");
		totalCotisation = totalCotisation + (salaireBrut * COTI_ASS_MALADIE)/100;
		
		System.out.println("- Assurance vieillesse");
		System.out.println( salaireBrut + "€ x " + COTI_ASS_VIEILLESSE + " % = " + (salaireBrut * COTI_ASS_VIEILLESSE)/100  + " €");
		totalCotisation = totalCotisation + (salaireBrut * COTI_ASS_VIEILLESSE)/100;
		
		System.out.println("- Assurance chômage");
		System.out.println( salaireBrut + "€ x " + COTI_ASS_CHOMAGE + " % = " + (salaireBrut * COTI_ASS_CHOMAGE)/100  + " €");
		totalCotisation = totalCotisation + (salaireBrut * COTI_ASS_CHOMAGE)/100;
		
		System.out.println("- Retraite complémentaire (IRCEM)");
		System.out.println( salaireBrut + "€ x " + COTI_RETRAIT_COMP + " % = " + (salaireBrut * COTI_RETRAIT_COMP)/100  + " €");
		totalCotisation = totalCotisation + (salaireBrut * COTI_RETRAIT_COMP)/100;
		
		System.out.println("- Cotisation AGFF");
		System.out.println( salaireBrut + "€ x " + COTI_AGFF + " % = " + (salaireBrut * COTI_AGFF)/100  + " €");
		totalCotisation = totalCotisation + (salaireBrut * COTI_AGFF)/100;
		
		System.out.println("Total des cotisations salariales :");
		System.out.println( totalCotisation + " €");
		
		salaireNet = (salaireBrut - totalCotisation);
		System.out.println("Salaire Net :" + salaireNet + "€");
		System.out.printf("Salaire Net : %.2f€" , salaireNet);
		// TODO faire le calcule des primes 
	}
	public static void calculatePrime() {
		switch (nombreEnfants) {
		case 0:
			 primeFamiliale = 0;
			break;
		case 1:
			primeFamiliale = 20;
			
			break;
		case 2:
			primeFamiliale = 50;
			
			break;

		default:
			primeFamiliale = 70 + (nombreEnfants-2)*20;
			break;
		}
		System.out.println("- Prime familiale :"  + primeFamiliale + " €");
		System.out.printf("Salaire net à payer : %.2f€" , salaireNet+primeFamiliale);
	}
	public static void calculateBrut() {
		System.out.println("Bulletin de " + nom + " " + prenom);
		
		switch (statut) {
		case ID_ASERVICE:
			statutTexte = STAT_ASERVICE;
			break;
		case ID_EBUREAU:
			statutTexte = STAT_EBUREAU;
			break;
		
		default:
			statutTexte = STAT_CADRE;
			break;
		}
		System.out.println("Statut " + statutTexte);
		
		if (nbHeuresTravaille <= H_BASE) {
			//pas de majoration
			nbHNormal = nbHeuresTravaille;
		} else {
			nbHNormal = H_BASE;
			nbHeureRestantes = (int)(nbHeuresTravaille - H_BASE);
			if (nbHeuresTravaille <= H_MAJOR) {
				// 50 %
				nbHMajor = nbHeureRestantes;
			}else {
				//60 %
				nbHMajor = H_MAJOR;
				nbHMajorPlus = (nbHeureRestantes - H_MAJOR);
			}
		}
		
		salaireBrut = (nbHNormal * tauxHoraire) + (nbHMajor * tauxHoraire * 1.5) + (nbHMajorPlus * tauxHoraire * 1.6);
	}
	public static String giveLName() {
		String ln;		
		System.out.println("Ecrivez votre nom:");
		ln = (String)Pratique.saisir("Valider avec [Enter]");
		System.out.println("Votre nom est: " + ln);		
		return ln;
	}
	
	public static String giveFName() {
		String fn;		
		System.out.println("Ecrivez votre prenom:");
		fn = (String)Pratique.saisir("Valider avec [Enter]");
		System.out.println("Votre prenom est: " + fn);		
		return fn;
	}
	
	public static int giveStatut() {
		int s;
		do {			
			System.out.println("Veuilez choisir votre statut:");
			System.out.println( ID_ASERVICE + ":" + STAT_ASERVICE);
			System.out.println( ID_EBUREAU + ":" + STAT_EBUREAU);
			System.out.println( ID_CADRE + ":" + STAT_CADRE);
			s = Pratique.saisirUnEntier("");
			System.out.println("Vous avez choisi: " + s);
		} while (s == -1 | !Pratique.estComprisEntre( (double)1, (double)3, (double)s ));
		System.out.println("vous avez choisi: " + s);
		return s;
	}
	
	public static int giveHoursWork() {
		int h;
		do {			
			System.out.println("Veuilez choisir le nombre d'heures travaillés:");
			h = Pratique.saisirUnEntier("");
			System.out.println("Vous avez choisi: " + h);
		} while (Double.isNaN(h));
		System.out.println("vous avez travaillé: " + h + "h");
		return h;
	}
		
	public static double giveTimeValue() {
		double th;
		do {			
			System.out.println("Veuilez choisir le taux horaire:");
			th = Pratique.saisirUnDecimal("");
			System.out.println("Vous avez choisi: " + th);
		} while (Double.isNaN(th));
		System.out.println("vous etes payé: " + th + " de l'heure");
		return th;
	}
	public static int giveNbChildren() {
		int c;
		do {			
			System.out.println("Veuilez indequer le nombre d'enfants à charge:");
			c = Pratique.saisirUnEntier("");
			System.out.println("Vous avez choisi: " + c);
		} while (c == -1 );
		System.out.println("vous avez " + c + " enfant(s)");
		return c;
	}
	

}
