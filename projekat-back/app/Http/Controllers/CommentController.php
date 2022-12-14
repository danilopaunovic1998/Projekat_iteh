<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Resources\CommentCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($anime_id)
    {
        $comments = Comment::all()->where('anime_id', '=', $anime_id);
        return new CommentCollection($comments);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $comment = new Comment;

        $comment->body = $request->text;
        if ($request->parent_id == 'null' || $request->parent_id == "") {
            $comment->parent_id = null;
        } else $comment->parent_id = $request->parent_id;


        $comment->anime_id = $request->anime_id;
        $comment->user_id = Auth::user()->id;
        $comment->username = Auth::user()->username;

        $comment->save();
        return response()->json(["comment" => $comment]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Coment  $coment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $coment)
    {
        //
    }

    public function edit(Comment $coment)
    {
        //
    }
    /**
     * @param  \Illuminate\Http\Request  $request
     */
    public function update(Request $request, $comment_id)
    {
        $data = $request->validate([
            'body' => "string"
        ]);
        $comment = Comment::find($comment_id);
        if ($comment) {
            $comment->update($data);
            return response()->json(['data' => $comment, "data2" => $data]);
        } else {
            return response()->json(['message' => 'comment not found']);
        }
    }


    public function destroy($comment)
    {
        $deleted = DB::table('comments')->where('id', '=', $comment)->delete();
        $deleted_childs = DB::table('comments')->where('parent_id', '=', $comment)->delete();
    }
}
