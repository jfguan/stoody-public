//
//  main.cpp
//  playground
//
//  Created by Alexandra Wu on 2018/10/23.
//  Copyright © 2018 Alexandra Wu. All rights reserved.
//

#include <iostream>
#include <vector>

using namespace std;

int main(int argc, const char * argv[]) {
    //sort vector with default < operator
    vector<int> vec = { 3, 5, 6, 1, 2};
    sort(vec.begin(), vec.end());
    for(int i = 0; i < vec.size(); i++) {
        cout << vec[i] << endl;
    }
    
    cout << "----------------------------------" << endl;
    
    //sort vector with > operator
    vector<int> vec2 = { 3, 5, 6, 1, 2};
    sort(vec2.begin(), vec2.end(), greater<int>());
    for(int i = 0; i < vec2.size(); i++) {
        cout << vec2[i] << endl;
    }
    
    cout << "----------------------------------" << endl;
    
    //question 10 from fri review session
    int myints[] = {15, 21, 43, 40, 28, 50, 54, 35};
    for(auto& val: myints) ++val;
    vector<int> vec3(myints, myints + 7);
    sort(vec3.begin(), vec3.begin() + 4, greater<int>());
    reverse(vec3.begin(), vec3.end());
    sort(vec3.begin(), vec3.begin() + 3, less<int>());
    auto it = vec3.insert(vec3.begin() + 5, 3, 19);
    vec3.erase(vec3.begin() + 3, it);
    swap(vec3[1], vec3[4]);
    for(auto val: vec3) {
        cout << val << " ";
    }
    
    cout << "----------------------------------" << endl;
    
    return 0;
}
