import 'package:flutter/material.dart';
import 'package:datagest/theme.dart';
import 'package:datagest/template.dart';
import 'package:datagest/routes/create_db.dart';

class MainMenuRoute extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    var content = Column(children: <Widget>[
      Text("Hello, world!", style: dgTextTheme.headline1),
      ElevatedButton(
        onPressed: () => Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => CreateDBRoute())
        ),
        child: Text("Click!")
      )
    ]);

    return Template(content, hideNavIcons: true,);
  }

}
