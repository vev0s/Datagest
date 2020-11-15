import 'package:flutter/material.dart';
import 'package:datagest/theme.dart';

class Navbar extends StatelessWidget {
  Navbar(this.title, {this.hideIcons});

  // Fields in a Widget subclass are always marked "final".

  final Widget title;
  final bool? hideIcons;

  @override
  Widget build(BuildContext context) {
    var navContent = <Widget>[];

    // Menu icon
    if (hideIcons == false) {
      navContent.add(
          IconButton(
              icon: Icon(Icons.menu),
              tooltip: 'Navigation menu',
              onPressed: null
          )
      );
    }

    // Title
    navContent.add(
      Expanded(child: title,)
    );

    // Search icon
    if (hideIcons == false) {
      navContent.add(
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          )
      );
    }

    return Container(
      height: 56.0,
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      decoration: BoxDecoration(color: dgColorScheme.surface),
      child: Row(
        children: navContent,
      ),
    );
  }
}

class Template extends StatelessWidget {

  Template(this.content, {this.hideNavIcons});

  final Widget content;
  final bool? hideNavIcons;

  @override
  Widget build(BuildContext context) {
    var title = Center(child: Text('DATAGEST', style: dgTextTheme.headline4));

    return Material(
      // Column is a vertical, linear layout.
      child: Column(
        children: <Widget>[
          Navbar(title, hideIcons: hideNavIcons),
          Expanded(child: content),
        ],
      ),
    );
  }
}