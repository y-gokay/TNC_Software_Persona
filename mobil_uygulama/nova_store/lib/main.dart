import 'package:flutter/material.dart';

import 'cart/cart_scope.dart';
import 'models/cart_item.dart';
import 'models/product.dart';
import 'screens/cart_page.dart';
import 'screens/home_page.dart';
import 'screens/product_detail_page.dart';
import 'screens/product_list_page.dart';

void main() {
  runApp(const NovaStoreApp());
}

class NovaStoreApp extends StatefulWidget {
  const NovaStoreApp({super.key});

  @override
  State<NovaStoreApp> createState() => _NovaStoreAppState();
}

class _NovaStoreAppState extends State<NovaStoreApp> {
  List<CartItem> _items = [];

  void _add(Product product) {
    setState(() {
      final next = [..._items];
      final index = next.indexWhere((item) => item.product.id == product.id);
      if (index == -1) {
        next.add(CartItem(product: product, quantity: 1));
      } else {
        next[index] = next[index].copyWith(quantity: next[index].quantity + 1);
      }
      _items = next;
    });
  }

  void _remove(int productId) {
    setState(() {
      _items = _items.where((item) => item.product.id != productId).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return CartScope(
      items: _items,
      onAdd: _add,
      onRemove: _remove,
      child: MaterialApp(
        title: 'NovaStore',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFF0369A1),
          ),
          useMaterial3: true,
        ),
        initialRoute: '/',
        onGenerateRoute: (settings) {
          switch (settings.name) {
            case '/':
              return MaterialPageRoute(
                builder: (_) => const HomePage(),
                settings: settings,
              );
            case '/products':
              final category = settings.arguments as String?;
              return MaterialPageRoute(
                builder: (_) => ProductListPage(initialCategory: category),
                settings: settings,
              );
            case '/detail':
              final product = settings.arguments as Product;
              return MaterialPageRoute(
                builder: (_) => ProductDetailPage(product: product),
                settings: settings,
              );
            case '/cart':
              return MaterialPageRoute(
                builder: (_) => const CartPage(),
                settings: settings,
              );
            default:
              return MaterialPageRoute(
                builder: (_) => const HomePage(),
                settings: settings,
              );
          }
        },
      ),
    );
  }
}
