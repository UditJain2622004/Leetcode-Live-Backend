// num = int(input())
// flag = False
// if num == 1:
//     print("false")
// elif num > 1:
//     for i in range(2, num):
//         if (num % i) == 0:
//             flag = True
//             break
//     if flag:
//         print("false")
//     else:
//         print("true")

// n=int(input())
// temp=n
// rev=0
// while(n>0):
//     dig=n%10
//     rev=rev*10+dig
//     n=n//10
// if(temp==rev):
//     print("true")
// else:
//     print("false")

// #include <iostream>
// using namespace std;
// int main() {
//   int i, n;
//   bool is_prime = true;
//   cin >> n;
//   if (n == 0 || n == 1) {
//     is_prime = false;
//   }
//   for (i = 2; i <= n/2; ++i) {
//     if (n % i == 0) {
//       is_prime = false;
//       break;
//     }
//   }
//   if (is_prime)
//     cout <<"true";
//   else
//     cout<<"false";

//   return 0;
// }

// import java.util.Scanner;

// public class Main {

//   public static void main(String[] args) {

//     Scanner myObj = new Scanner(System.in);
//     int n = myObj.nextInt();
//     int i,m=0,flag=0;

//   m=n/2;
//   if(n==0||n==1){
//    System.out.println("false");
//   }else{
//    for(i=2;i<=m;i++){
//     if(n%i==0){
//      System.out.println("false");
//      flag=1;
//      break;
//     }
//    }
//    if(flag==0)  { System.out.println("true"); }
//   }
//   }
// }
