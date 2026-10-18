import 'package:flutter/material.dart';

import '../cart/cart_scope.dart';
import '../models/product.dart';

class ProductDetailPage extends StatelessWidget {
  final Product product;

  const ProductDetailPage({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    final cart = CartScope.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(product.name),
        actions: [
          IconButton(
            onPressed: () => Navigator.pushNamed(context, '/cart'),
            icon: Badge(
              isLabelVisible: cart.count > 0,
              label: Text('${cart.count}'),
              child: const Icon(Icons.shopping_bag_outlined),
            ),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            height: 240,
            decoration: BoxDecoration(
              color: const Color(0xFFF1F5F9),
              borderRadius: BorderRadius.circular(12),
            ),
            padding: const EdgeInsets.all(16),
            child: Image.asset(
              product.image,
              fit: BoxFit.contain,
              errorBuilder: (context, error, stackTrace) {
                return const Icon(Icons.devices, size: 72);
              },
            ),
          ),
          const SizedBox(height: 16),
          Text(
            product.name,
            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 4),
          Text(
            product.tagline,
            style: const TextStyle(color: Color(0xFF64748B)),
          ),
          const SizedBox(height: 8),
          Text(
            product.price,
            style: const TextStyle(
              fontSize: 20,
              color: Color(0xFF0369A1),
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 16),
          Text(product.description),
          const SizedBox(height: 16),
          const Text(
            'Ozellikler',
            style: TextStyle(fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 8),
          ...product.specs.entries.map(
            (entry) => ListTile(
              dense: true,
              contentPadding: EdgeInsets.zero,
              title: Text(entry.key),
              trailing: Text(entry.value),
            ),
          ),
          const SizedBox(height: 12),
          FilledButton.icon(
            onPressed: () {
              cart.onAdd(product);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('${product.name} sepete eklendi')),
              );
            },
            icon: const Icon(Icons.add_shopping_cart),
            label: const Text('Sepete ekle'),
          ),
        ],
      ),
    );
  }
}
