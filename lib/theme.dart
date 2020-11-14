import 'package:flutter/material.dart';

// COLOR SCHEME
const dgColorScheme = const ColorScheme(
  primary: const Color(0xff21986D),
  primaryVariant: const Color(0xff3700B3),
  secondary: const Color(0xff03dac6),
  secondaryVariant: const Color(0xff03dac6),
  surface: const Color(0xff101010),
  background: const Color(0xff212121),
  error: const Color(0xffcf6679),
  onPrimary: Colors.black,
  onSecondary: Colors.black,
  onSurface: Colors.white,
  onBackground: Colors.white,
  onError: Colors.black,
  brightness: Brightness.dark,
);


// TEXT SCHEME
const fontWeightLight = FontWeight.w300;
const fontWeightRegular = FontWeight.w400;
const fontWeightMedium = FontWeight.w500;

final dgTextTheme = TextTheme(
  headline1: TextStyle(
    fontSize: 96.0,
    fontWeight: fontWeightLight,
    letterSpacing: -1.5
  ),
  headline2: TextStyle(
    fontSize: 60.0,
    fontWeight: fontWeightLight,
    letterSpacing: -0.5
  ),
  headline3: TextStyle(
    fontSize: 48.0,
    fontWeight: fontWeightRegular,
    letterSpacing: 0.0
  ),
  headline4: TextStyle(
    fontSize: 34.0,
    fontWeight: fontWeightRegular,
    letterSpacing: 0.25,
    color: dgColorScheme.primary
  ),
  headline5: TextStyle(
    fontSize: 24.0,
    fontWeight: fontWeightRegular,
    letterSpacing: 0.0,
    color: dgColorScheme.primary
  ),
  headline6: TextStyle(
    fontSize: 20.0,
    fontWeight: fontWeightMedium,
    letterSpacing: 0.15
  ),
);