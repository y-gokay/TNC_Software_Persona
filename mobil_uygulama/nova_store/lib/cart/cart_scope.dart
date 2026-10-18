import 'package:flutter/material.dart';

import '../models/cart_item.dart';
import '../models/product.dart';

class CartScope extends InheritedWidget {
  final List<CartItem> items;
  final void Function(Product product) onAdd;
  final void Function(int productId) onRemove;

  const CartScope({
    super.key,
    required this.items,
    required this.onAdd,
    required this.onRemove,
    required super.child,
  });

  int get count {
    var total = 0;
    for (final item in items) {
      total += item.quantity;
    }
    return total;
  }

  static CartScope of(BuildContext context) {
    final scope = context.dependOnInheritedWidgetOfExactType<CartScope>();
    assert(scope != null, 'CartScope bulunamadi');
    return scope!;
  }

  @override
  bool updateShouldNotify(CartScope oldWidget) {
    return items != oldWidget.items;
  }
}
