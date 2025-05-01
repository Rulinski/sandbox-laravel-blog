<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_all_posts(): void
    {
        Post::factory(10)->create();

        $response = $this->getJson('/api/posts');
        // $response = $this->getJson(route('posts.index'));

        $response->assertStatus(200)
            ->assertJsonCount(10, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'author', 'title', 'body']
                ]
            ]);
    }

    public function test_can_store_new_post(): void
    {
        $postData = [
            'author' => 'Test Author',
            'title' => 'Test Title',
            'body' => 'Test Body'
        ];

        $response = $this->postJson('/api/posts', $postData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => ['id', 'author', 'title', 'body']
            ]);

        $this->assertDatabaseHas('posts', $postData);
    }

    public function test_can_show_post(): void
    {
        $post = Post::factory()->create();

        // $response = $this->getJson("/api/posts/{$post->id}");
        $response = $this->getJson(route('posts.show', $post));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => ['id', 'author', 'title', 'body']
            ]);
    }

    public function test_can_update_post(): void
    {
        $post = Post::factory()->create();

        $updateData = [
            'author' => 'Updated Author',
            'title' => 'Updated Title',
            'body' => 'Updated Body'
        ];

        $response = $this->putJson("/api/posts/$post->id", $updateData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => ['author', 'title', 'body']
            ]);

        // $post->refresh();
        // $this->assertEquals('Updated Author', $post->author);
        // $this->assertEquals('Updated Title', $post->title);
        // $this->assertEquals('Updated Body', $post->body);

        $this->assertDatabaseHas('posts', $updateData);
    }

    public function test_can_delete_post(): void
    {
        $post = Post::factory()->create();

        $response = $this->deleteJson("/api/posts/$post->id");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }

    public function test_validates_required_fields_when_storing(): void
    {
        $post = Post::factory()->create([
            'author' => fake()->name(),
            'body' => fake()->paragraph(),
        ]);

        $response = $this->postJson(route('posts.store'), [
            'author' => $post->author,
            'body' => $post->body,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title']);
    }

    public function test_validates_unique_title_when_storing(): void
    {
        $existingPost = Post::factory()->create();

        $response = $this->postJson('/api/posts', [
            'author' => 'Test Author',
            'title' => $existingPost->title,
            'body' => 'Test Body'
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title']);
    }

    public function test_validates_required_fields_when_updating(): void
    {
        $post = Post::factory()->create();

        $response = $this->putJson("/api/posts/$post->id", []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['author', 'title', 'body']);
    }
}
