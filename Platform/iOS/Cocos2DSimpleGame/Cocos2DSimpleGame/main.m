//
//  main.m
//  Cocos2DSimpleGame
//
//  Created by Aleksandar Trpeski on 5/4/13.
//  Copyright ARANEA 2013. All rights reserved.
//

#import <UIKit/UIKit.h>

int main(int argc, char *argv[]) {
    
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
    int retVal = UIApplicationMain(argc, argv, nil, @"AppController");
    [pool release];
    return retVal;
}
