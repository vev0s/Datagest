import 'package:flutter/material.dart';
import 'package:datagest/theme.dart';
import 'package:datagest/template.dart';

class CreateDBRoute extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    var content = Column(children: <Widget>[
      Text("Hello, DB!", style: dgTextTheme.headline1),
      ElevatedButton(
          onPressed: () => Navigator.pop(context),
          child: Text("Go back!")
      )
    ]);

    return Template(content, hideNavIcons: true,);
  }

}