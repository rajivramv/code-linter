export const sampleCppProgram = `#include <iostream>
using namespace std;

int main()
{
	int count, i, arr[30], num, first, last, middle;
	cout<<"how many elements would you like to enter?:"; 
        cin>>count;

	for (i=0; i<count; i++)
	{
		cout<<"Enter number "<<(i+1)<<": "; 
                cin>>arr[i];
	}
	cout<<"Enter the number that you want to search:"; 
        cin>>num;
	first = 0;
	last = count-1;
	middle = (first+last)/2;
	while (first <= last)
	{
	   if(arr[middle] < num)
	   {
		first = middle + 1;

	   }
	   else if(arr[middle] == num)
	   {
		cout<<num<<" found in the array at the location "<<middle+1<<"\n"; 
                break; 
           } 
           else { 
                last = middle - 1; 
           } 
           middle = (first + last)/2; 
        } 
        if(first > last)
	{
	   cout<<num<<" not found in the array";
	}
	return 0;
}`;

export const sampleJavaProgram = `public class ComplexNumber{
   //for real and imaginary parts of complex numbers
   double real, img;
	
   //constructor to initialize the complex number
   ComplexNumber(double r, double i){
	this.real = r;
	this.img = i;
   }
	
   public static ComplexNumber sum(ComplexNumber c1, ComplexNumber c2)
   {
	//creating a temporary complex number to hold the sum of two numbers
        ComplexNumber temp = new ComplexNumber(0, 0);

        temp.real = c1.real + c2.real;
        temp.img = c1.img + c2.img;
        
        //returning the output complex number
        return temp;
    }
    public static void main(String args[]) {
	ComplexNumber c1 = new ComplexNumber(5.5, 4);
	ComplexNumber c2 = new ComplexNumber(1.2, 3.5);
        ComplexNumber temp = sum(c1, c2);
        System.out.printf("Sum is: "+ temp.real+" + "+ temp.img +"i");
    }
}
`;