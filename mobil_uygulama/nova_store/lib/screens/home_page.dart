import 'package:flutter/material.dart';

import '../cart/cart_scope.dart';
import '../data/product_repository.dart';
import '../models/product.dart';
import '../widgets/product_card.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _repository = ProductRepository();
  late Future<List<Product>> _future;

  @override
  void initState() {
    super.initState();
    _future = _repository.loadProducts();
  }

  @override
  Widget build(BuildContext context) {
    final cart = CartScope.of(context);
    const categories = ['Telefon', 'Bilgisayar', 'Tablet', 'Saat', 'Ses', 'Ev'];

    return Scaffold(
      appBar: AppBar(
        title: const Text('NovaStore'),
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
      body: FutureBuilder<List<Product>>(
        future: _future,
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          }

          final featured = snapshot.data!.take(4).toList();

          return ListView(
            padding: const EdgeInsets.only(bottom: 24),
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.asset(
                    'assets/images/banner.png',
                    height: 160,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        height: 160,
                        color: const Color(0xFF0F172A),
                        alignment: Alignment.center,
                        child: const Text(
                          'NovaStore',
                          style: TextStyle(color: Colors.white, fontSize: 24),
                        ),
                      );
                    },
                  ),
                ),
              ),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: Text(
                  'Mini katalog. JSON asset, sepet simulasyonu.',
                  style: TextStyle(color: Color(0xFF64748B)),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                height: 40,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  children: categories
                      .map(
                        (category) => Padding(
                          padding: const EdgeInsets.only(right: 8),
                          child: ActionChip(
                            label: Text(category),
                            onPressed: () {
                              Navigator.pushNamed(
                                context,
                                '/products',
                                arguments: category,
                              );
                            },
                          ),
                        ),
                      )
                      .toList(),
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 20, 16, 8),
                child: Row(
                  children: [
                    const Expanded(
                      child: Text(
                        'One cikanlar',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    TextButton(
                      onPressed: () => Navigator.pushNamed(context, '/products'),
                      child: const Text('Tumu'),
                    ),
                  ],
                ),
              ),
              GridView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: featured.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  childAspectRatio: 0.72,
                  crossAxisSpacing: 8,
                  mainAxisSpacing: 8,
                ),
                itemBuilder: (context, index) {
                  final product = featured[index];
                  return ProductCard(
                    product: product,
                    onTap: () {
                      Navigator.pushNamed(
                        context,
                        '/detail',
                        arguments: product,
                      );
                    },
                  );
                },
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 20, 16, 0),
                child: FilledButton(
                  onPressed: () => Navigator.pushNamed(context, '/products'),
                  child: const Text('Kataloga git'),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
