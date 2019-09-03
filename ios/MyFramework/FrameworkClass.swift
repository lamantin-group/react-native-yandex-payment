//
//  ExampleClass.swift
//  MyFramework
//
//  Created by Антон Власов on 02/09/2019.
//  Copyright © 2019 whalemare. All rights reserved.
//

import Foundation

public class FrameworkClass {
    public static func getRandomNumber() -> Int {
        let numbers = [0, 1, 2, 3, 4]
        let randomIndex = Int(arc4random_uniform(UInt32(numbers.count)))
        return numbers[randomIndex]
    }
}
