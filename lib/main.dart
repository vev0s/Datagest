import 'package:flutter/material.dart';
import 'package:datagest/theme.dart';
import 'routes/main_menu.dart';

void main() {
  runApp(MaterialApp(
    title: 'Datagest', // used by the OS task switcher
    home: MainMenuRoute(),
    theme: ThemeData.from(colorScheme: dgColorScheme)
  ));
}