import 'package:flutter/material.dart';

import '../cart/cart_scope.dart';

class CartPage extends StatelessWidget {
  const CartPage({super.key});

  @override
  Widget build(BuildContext context) {
    final cart = CartScope.of(context);

    return Scaffold(
      appBar: AppBar(title: const Text('Sepet')),
      body: cart.items.isEmpty
          ? const Center(child: Text('Sepet bos.'))
          : Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    itemCount: cart.items.length,
                    itemBuilder: (context, index) {
                      final item = cart.items[index];
                      return Card(
                        margin: const EdgeInsets.fromLTRB(12, 8, 12, 0),
                        child: ListTile(
                          leading: Image.asset(
                            item.product.image,
                            width: 48,
                            height: 48,
                            errorBuilder: (context, error, stackTrace) {
                              return const Icon(Icons.devices);
                            },
                          ),
                          title: Text(item.product.name),
                          subtitle: Text(
                            '${item.product.price}  x${item.quantity}',
                          ),
                          trailing: IconButton(
                            onPressed: () => cart.onRemove(item.product.id),
                            icon: const Icon(Icons.delete_outline),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text('Toplam urun: ${cart.count}'),
                      const SizedBox(height: 8),
                      FilledButton(
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text(
                                'Siparis simülasyon. Gercek odeme yok.',
                              ),
                            ),
                          );
                        },
                        child: const Text('Siparisi tamamla'),
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }
}
