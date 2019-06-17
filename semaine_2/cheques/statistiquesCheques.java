package cheques;

import Outils.Pratique;
import Outils.textRefact;

public class statistiquesCheques {
	final public static double LIMITE_MONTANT = 200; 
	final public static int MAX_CHEQUES = 100; 
	public static double[] allChequesIDs = new double[MAX_CHEQUES];
	public static double[] allChequesValues = new double[MAX_CHEQUES];
	public static double[][] allCheques = {allChequesIDs, allChequesValues};
	public static int nbCheques = 0;
	
	
	public static void main(String[] args) {
		saisirCheques();
		displayingInformations();		
	}
	// affiche le resultat 
	public static void displayingInformations() {
		System.out.println(textRefact.titleThat("nombre de cheque(s): " + nbCheques));
		displayAllsCheques();
		System.out.println(textRefact.titleThat("montant total:", (""+ giveChequesSom(allCheques[1], nbCheques) + (char)8364)));
		System.out.println(textRefact.titleThat("somme moyenne:", (""+ giveChequesMoy(allCheques[1]) + (char)8364)));
		System.out.println(textRefact.line());
		System.out.println(textRefact.textAndWhite("Nombre de cheque en dessous de " + LIMITE_MONTANT + (char)8364));
		System.out.println(textRefact.textAndWhite(String.valueOf(giveChequesUdderLimite(allCheques[1]).length)));
		System.out.println(textRefact.textAndWhite("Total: " + giveTotalChequesUdderLimite(allCheques[1]) ));
		System.out.println(textRefact.line());
		
		System.out.println(textRefact.textAndWhite("Nombre de cheque au dessus de " + LIMITE_MONTANT + (char)8364));
		System.out.println(textRefact.textAndWhite(String.valueOf(giveChequesUpperLimite(allCheques[1]).length)));
		System.out.println(textRefact.textAndWhite("Total: " + giveTotalChequesUpperLimite(allCheques[1]) + (char)8364) );
		System.out.println(textRefact.line());
		
		System.out.println(textRefact.textAndWhite("Cheque min: " + giveChequeMin(allCheques[1]) + (char)8364+" n°:" + giveNumChequeMin(allCheques)));
		System.out.println(textRefact.textAndWhite("Cheque max: " + giveChequeMax(allCheques[1]) + (char)8364+" n°:" + giveNumChequeMax(allCheques)));
		System.out.println(textRefact.line());
		
		
	}

	/**
	 * saisirCheques
	 * 
	 * demande de saisie des cheques
	 * 
	 * @return le tableau [ids cheques][values cheques]
	 */
	public static double[][] saisirCheques() {
		boolean exit = false;
		do {			
			double[] chequeInfos;
			chequeInfos = giveChequesInfos();
			if(chequeInfos[0] != (double)-1) {
				allCheques[0][nbCheques-1] = chequeInfos[0];
				allCheques[1][nbCheques-1] = chequeInfos[1];
			}else {
				exit = true;
			}
		} while ((nbCheques <= MAX_CHEQUES) && !exit);
		
		
		return allCheques;
	}
	/**
	 * displayAllsCheques
	 * 
	 * affiche une liste de tous les cheques
	 */
	public static void displayAllsCheques() {
		System.out.println(textRefact.titleThat("Tous les Cheques"));
		System.out.println(textRefact.line());
		for (int i = 0; i < nbCheques; i++) {
			System.out.println(textRefact.textAndWhite(i + ": Cheque n°: " + allCheques[0][i] + " montant: " + allCheques[1][i] + (char)8364));
		}
		System.out.println(textRefact.line());	
	}
	/**
	 * giveNumChequeMin
	 * 
	 * cherche le numero du cheque dont le montant est le minimum
	 * @param ar - le tableau de cheques
	 * @return le numero du cheque
	 */
	public static int giveNumChequeMin(double[][] ar) {
		double min = Double.MAX_VALUE;
		int num = -1;
		for (int i = 0; i < nbCheques; i++) {
			if(min > ar[1][i]) {
				min = ar[1][i];
				num = (int)ar[0][i];
			}
		}
		return num;
	}
	/**
	 * giveNumChequeMax
	 * cherche le cheque dont le montant est le minimum
	 * @param ar - le tableau de cheque
	 * @return le numero du cheque maximum
	 */
	public static int giveNumChequeMax(double[][] ar) {
		double max = 0;
		int num = -1;
		for (int i = 0; i < nbCheques; i++) {
			if(max <= ar[1][i]) {
				max = ar[1][i];
				num = (int)ar[0][i];
				
			}
		}
		return num;
	}
	
	/**
	 * giveChequeMin
	 * cherche le cheque dont le montant est le minimum
	 * @param ar - le tableau de cheque
	 * @return le montant du cheque minimum
	 */
	public static double giveChequeMin(double[] ar) {
		double min = Double.MAX_VALUE;
		for (int i = 0; i < nbCheques; i++) {
			if(min > ar[i]) {
				min = ar[i];
			}
		}
		return min;
	}
	/**
	 * giveChequeMax
	 * cherche le cheque dont le montant est le minimum
	 * @param ar - le tableau de cheque
	 * @return le montant du cheque maximum
	 */
	public static double giveChequeMax(double[] ar) {
		double max = 0;
		for (int i = 0; i < nbCheques; i++) {
			if(max < ar[i]) {
				max = ar[i];
			}
		}
		return max;
	}
	/**
	 * giveTotalChequesUdderLimite
	 * cherche les cheques dont le montant est inférieur à la limite
	 * @param ar - le tableau des cheque
	 * @return le total de ces cheques
	 */
	public static double giveTotalChequesUdderLimite(double[] ar) {
		 return  giveChequesSom(giveChequesUdderLimite(ar), giveChequesUdderLimite(ar).length);
	}
	/**
	 * giveChequesUdderLimite
	 * cherche les cheques dont le montant est inférieur à la limite
	 * @param ar - le tableau des cheque
	 * @return tous les cheques
	 */
	public static double[] giveChequesUdderLimite(double[] ar) {
		double[] chUdTmp = new double[MAX_CHEQUES];
		int nBChUd = 0;
		
		for (int i = 0; i < nbCheques; i++) {
			if(ar[i] < (double)LIMITE_MONTANT) {
				chUdTmp[i] = ar[i];
				nBChUd ++;				
			}
		}
		double[] chUd = new double[nBChUd];
		for (int i = 0; i < nBChUd; i++) {
			chUd[i] = chUdTmp[i];
		}
		return chUd;
	}
	/**
	 * giveTotalChequesUpperLimite
	 * cherche les cheques dont le montant est supérieur à la limite
	 * @param ar - le tableau des cheques
	 * @return le total de ces cheques
	 */
	public static double giveTotalChequesUpperLimite(double[] ar) {
	 return  giveChequesSom(giveChequesUpperLimite(ar), giveChequesUpperLimite(ar).length);
	}
	/**
	 * giveChequesUpperLimite
	 * cherche les cheques dont le montant est supérieur à la limite
	 * @param ar - le tableau des cheque
	 * @return tous les cheques
	 */
	public static double[] giveChequesUpperLimite(double[] ar) {
		double[] chUpTmp = new double[MAX_CHEQUES];
		int nBChUp = 0;
		for (int i = 0; i < nbCheques; i++) {
			if(ar[i] >= (double)LIMITE_MONTANT) {
				chUpTmp[i] = ar[i];
				nBChUp ++;				
			}
		}
		double[] chUp = new double[nBChUp];
		for (int i = 0; i < nBChUp; i++) {
			chUp[i] = chUpTmp[i];
		}
		
		return chUp;
	}
	/**
	 * giveChequesMoy
	 * prend tous les cheque et calcul la moyenne
	 * @param ar - le tableau des cheques
	 * @return la moyenne de ces cheques
	 */
	public static double giveChequesMoy(double[] ar) {
		return giveChequesSom(ar , ar.length)/nbCheques;
	}
	
	/**
	 * giveChequesSom
	 * prend tous les cheque et calcul le total
	 * @param ar - le tableau des cheques
	 * @return le total de ces cheques
	 */
	public static double giveChequesSom(double[] ar , int nb) {
		double tt = 0;
		for (int i = 0; i < nb; i++) {
//			tt += allCheques[1][i];
			tt += ar[i];
		}
		return tt;
	}
	/**
	 * giveChequesInfos
	 * permet de saisir les informations d'un cheque
	 * @return - le tableau de ce cheque
	 */
	public static double[] giveChequesInfos() {
		double cn = Double.NaN;
		double cid = Double.NaN;
		double[] arC = new double[2];
		boolean exit = false;
		do {			
			System.out.println("Indiquer le numero du cheque: ( -1 pour sortir )");
			cn = Pratique.saisirUnDecimal("");
//			System.out.println("Vous avez choisi: " + th);
			if(cn == (double)-1) {
				exit = true;
			}else {
				arC[0] = cn;
			}
			
		} while (Double.isNaN(cn));
		if(!exit) {
			do {			
				System.out.println("Indiquer le montant du cheque:");
				cid = Pratique.saisirUnDecimal("");
//				System.out.println("Vous avez choisi: " + th);
				arC[1] = cid;
			} while (Double.isNaN(cid));
			nbCheques ++; 
			System.out.println(nbCheques + "enregistrement du cheque n°:" + (int)cn + " de:  " + cid + "€\n");
		}
		
		
		double[] exiter = {-1 , -1};
		return exit?exiter:arC;
	}

}
