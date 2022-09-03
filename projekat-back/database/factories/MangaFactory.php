<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manga>
 */
class MangaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title_eng' => $this->faker->firstNameMale(),
            'title_jpn' => $this->faker->firstNameFemale(),
            'img' => $this->faker->imageUrl(),
            'chapters' => $this->faker->randomDigitNotNull(),
            'status' => $this->faker->randomElement(['Airing', 'Finished']),
            'synopsis' => $this->faker->sentence(7, true),
        ];
    }
}
