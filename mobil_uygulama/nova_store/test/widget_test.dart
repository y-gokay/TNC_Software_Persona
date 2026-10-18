import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:nova_store/main.dart';

void main() {
  testWidgets('Ana sayfa katalogu gosterir', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(400, 2400);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);

    await tester.pumpWidget(const NovaStoreApp());
    await tester.pumpAndSettle();

    expect(find.text('NovaStore'), findsWidgets);
    expect(find.text('Telefon'), findsOneWidget);
    expect(find.text('One cikanlar'), findsOneWidget);
    expect(find.text('iPhone 15 Pro'), findsWidgets);
    expect(find.text('Kataloga git'), findsOneWidget);
  });
}
