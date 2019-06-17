package maxEtCompare;

public class MaxCompare {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
	
		System.out.println(isMax(25,5));
		System.out.println(compareVals(1.0,1.0));
		System.out.println(compareVals(2,1.0));
		System.out.println(compareVals(1.0,3.0));
	}

	public static double isMax(double val1, double val2) {
		return (val1 > val2)?val1:val2;
	}

	public static int compareVals (double val1, double val2) {
		int rep;
		if (val1 > val2) {
			rep = 1;
		} else if (val2 > val1){
			rep = -1;
		}else {
			rep = 0;
		}
		return rep;
	}
}
